"""
Combined validator: runs validate_photo.py's full check suite (resolution,
blur, brightness, face count/size, forehead occlusion) AND cross-checks
head pose using 3DDFA_V2 instead of validate_photo.py's own 2D-landmark
pose heuristic.

Why swap the pose check specifically: a calibration run comparing the two
found validate_photo.py's yaw/roll agree with 3DDFA_V2 once you account for
a sign-convention difference, and its pitch had a real ~8.5deg bias that's
already been fixed -- but ~3.5deg of residual noise remains either way,
since it's still a 2D approximation. This script uses 3DDFA_V2's number as
the one that actually decides pass/fail on pose, since it's the more
trustworthy of the two. Every other check (blur, brightness, resolution,
face size, occlusion, face count) comes straight from validate_photo.py
unchanged.

Usage:
    python3 validate_full.py photo1.jpg photo2.png ...

Requires validate_photo.py to be present in this same folder -- copy your
current version in before running.
"""
import sys
import os
import threading
import importlib.util
import cv2
import mediapipe as mp

from pose3d import get_estimator

try:
    mp_face_detection = mp.solutions.face_detection
except (AttributeError, ModuleNotFoundError):
    try:
        from mediapipe.python.solutions import face_detection as mp_face_detection
    except Exception:
        mp_face_detection = None

# Keep in sync with validate_photo.py's own thresholds.
MAX_YAW_DEG = 25
MAX_PITCH_DEG = 20
MAX_ROLL_DEG = 20

POSE_FAILURE_CODES = {"head_turned", "head_tilted", "head_pitched"}
NO_SINGLE_FACE_CODES = {"no_face_detected", "multiple_faces"}

_HERE = os.path.dirname(os.path.abspath(__file__))
_VP_PATH = os.path.join(_HERE, "validate_photo.py")


def _load_validate_photo():
    if not os.path.exists(_VP_PATH):
        print(f"ERROR: validate_photo.py not found at {_VP_PATH}")
        print("Copy your validate_photo.py into this folder (next to validate_full.py) and try again.")
        sys.exit(1)
    spec = importlib.util.spec_from_file_location("validate_photo", _VP_PATH)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def detect_faces(img_bgr, min_confidence=0.5):
    h, w = img_bgr.shape[:2]
    rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    with mp_face_detection.FaceDetection(model_selection=1, min_detection_confidence=min_confidence) as fd:
        res = fd.process(rgb)
        if not res.detections:
            return []
        boxes = []
        for det in res.detections:
            bb = det.location_data.relative_bounding_box
            x0, y0 = bb.xmin * w, bb.ymin * h
            x1, y1 = x0 + bb.width * w, y0 + bb.height * h
            boxes.append((max(0, x0), max(0, y0), min(w, x1), min(h, y1)))
        return boxes


def check_image(path, vp_module, pose_estimator):
    base = vp_module.validate_photo(path)
    base_failures = base.get("failures", [])
    metrics = dict(base.get("metrics", {}))
    non_pose_failures = [f for f in base_failures if f["code"] not in POSE_FAILURE_CODES]

    # If 3DDFA / PyTorch estimator is not loaded, use validate_photo directly
    if pose_estimator is None:
        return base

    # No single usable face -> nothing for 3DDFA to check, report as-is.
    if any(f["code"] in NO_SINGLE_FACE_CODES for f in base_failures):
        return {
            "passed": False,
            "failures": non_pose_failures,
            "metrics": metrics,
            "pose_source": "n/a (no single face)",
        }

    img = cv2.imread(path)
    boxes = detect_faces(img)
    if len(boxes) != 1:
        # Shouldn't normally happen since validate_photo.py already
        # confirmed exactly one usable face -- guard anyway rather than
        # crash, fall back to validate_photo.py's own pose verdict.
        pose_failures = [f for f in base_failures if f["code"] in POSE_FAILURE_CODES]
        all_failures = non_pose_failures + pose_failures
        return {
            "passed": len(all_failures) == 0,
            "failures": all_failures,
            "metrics": metrics,
            "pose_source": "3ddfa re-detection mismatch, fell back to validate_photo.py pose",
        }

    box = boxes[0]
    try:
        yaw, pitch, roll = pose_estimator.estimate(img, box)
        metrics["yaw_deg_3ddfa"] = round(yaw, 1)
        metrics["pitch_deg_3ddfa"] = round(pitch, 1)
        metrics["roll_deg_3ddfa"] = round(roll, 1)

        pose_failures = []
        if abs(yaw) > MAX_YAW_DEG:
            pose_failures.append({"code": "head_turned",
                                   "message": "Please face the camera more directly (avoid a side profile)."})
        if abs(roll) > MAX_ROLL_DEG:
            pose_failures.append({"code": "head_tilted",
                                   "message": "Please keep your head level (avoid tilting it to the side)."})
        if abs(pitch) > MAX_PITCH_DEG:
            pose_failures.append({"code": "head_pitched",
                                   "message": "Please look straight at the camera (avoid tilting your chin up or down)."})

        all_failures = non_pose_failures + pose_failures
        return {"passed": len(all_failures) == 0, "failures": all_failures, "metrics": metrics, "pose_source": "3ddfa_v2"}
    except Exception as e:
        pose_failures = [f for f in base_failures if f["code"] in POSE_FAILURE_CODES]
        all_failures = non_pose_failures + pose_failures
        return {
            "passed": len(all_failures) == 0,
            "failures": all_failures,
            "metrics": metrics,
            "pose_source": f"3ddfa failed ({e}), fell back to validate_photo.py pose",
        }


# --- importable API for backend integration -------------------------------
# Use this from your upload-handling endpoint instead of shelling out to this
# script per request. Both underlying models (validate_photo.py's MediaPipe
# pipeline and 3DDFA_V2) are lazy-loaded once per process and reused --
# `validate()` itself is what you call per uploaded photo.
#
#   from validate_full import validate
#   result = validate("/tmp/uploaded_photo.jpg")
#   if not result["passed"]:
#       return jsonify({"error": result["failures"]}), 400
#
# Call get_validator() once at app startup if you want to pay the ~6s model
# load cost at boot rather than on the first request; validate() will do it
# lazily either way.

_lock = threading.Lock()
_vp_module = None
_pose_estimator = None


def get_validator():
    """Loads both underlying models once (thread-safe) and returns
    (vp_module, pose_estimator). Call this at app startup, or just call
    validate() directly and let it lazy-load on first use."""
    global _vp_module, _pose_estimator
    if _vp_module is None or _pose_estimator is None:
        with _lock:
            if _vp_module is None:
                _vp_module = _load_validate_photo()
            if _pose_estimator is None:
                _pose_estimator = get_estimator()
    return _vp_module, _pose_estimator


def validate(path):
    """The one function your backend needs. Takes a path to an already-saved
    upload, returns the same dict shape check_image() returns:
        {"passed": bool, "failures": [{"code": ..., "message": ...}, ...],
         "metrics": {...}, "pose_source": str}
    """
    vp_module, pose_estimator = get_validator()
    return check_image(path, vp_module, pose_estimator)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    print("Loading 3DDFA_V2 model (one-time, ~5-6s)...\n")
    for path in sys.argv[1:]:
        result = validate(path)
        verdict = "VALID" if result["passed"] else "INVALID"
        reasons = ", ".join(f["code"] for f in result["failures"]) if result["failures"] else "all checks passed"
        print(f"{path}: {verdict}  ({reasons})")


if __name__ == "__main__":
    main()
