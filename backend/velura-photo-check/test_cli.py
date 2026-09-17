"""
Command-line pass/fail tester for the 3DDFA_V2 pose check. Give it one or
more image paths, it detects the face itself (via MediaPipe, same detector
validate_photo.py uses), runs 3DDFA_V2's pose estimate, and prints a clean
VALID / INVALID verdict per image against validate_photo.py's own pose
thresholds (MAX_YAW_DEG / MAX_PITCH_DEG / MAX_ROLL_DEG).

This checks pose ONLY -- it does not re-run validate_photo.py's other
checks (blur, brightness, resolution, occlusion). An image can be VALID
here and still fail validate_photo.py for an unrelated reason, and vice
versa. Use this specifically to test/trust the pose gate; run
validate_photo.py itself for the full picture.

Usage:
    python3 test_cli.py photo1.jpg photo2.png ...

Exit behavior: keeps going on a per-image basis -- one bad/unreadable/
no-face image won't stop the rest of the batch from being tested.
"""
import sys
import cv2
import mediapipe as mp

from pose3d import get_estimator

mp_face_detection = mp.solutions.face_detection

# Same thresholds as validate_photo.py -- keep these in sync if that file's
# values ever change.
MAX_YAW_DEG = 25
MAX_PITCH_DEG = 20
MAX_ROLL_DEG = 20


def detect_faces(img_bgr, min_confidence=0.5):
    """Returns a list of (x0, y0, x1, y1) pixel boxes for every face found."""
    h, w = img_bgr.shape[:2]
    rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
    with mp_face_detection.FaceDetection(
        model_selection=1, min_detection_confidence=min_confidence
    ) as fd:
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


def check_image(path, estimator):
    """Returns (verdict, reason, details) where verdict is 'VALID' or
    'INVALID', reason is a short human string, and details is the
    yaw/pitch/roll tuple or None."""
    img = cv2.imread(path)
    if img is None:
        return "INVALID", "could not read image (bad path or unsupported format)", None

    boxes = detect_faces(img)
    if len(boxes) == 0:
        return "INVALID", "no face detected", None
    if len(boxes) > 1:
        return "INVALID", f"multiple faces detected ({len(boxes)})", None

    box = boxes[0]
    try:
        yaw, pitch, roll = estimator.estimate(img, box)
    except Exception as e:
        return "INVALID", f"pose estimation failed: {e}", None

    failures = []
    if abs(yaw) > MAX_YAW_DEG:
        failures.append(f"yaw {yaw:+.1f} exceeds {MAX_YAW_DEG}")
    if abs(pitch) > MAX_PITCH_DEG:
        failures.append(f"pitch {pitch:+.1f} exceeds {MAX_PITCH_DEG}")
    if abs(roll) > MAX_ROLL_DEG:
        failures.append(f"roll {roll:+.1f} exceeds {MAX_ROLL_DEG}")

    if failures:
        return "INVALID", "; ".join(failures), (yaw, pitch, roll)
    return "VALID", "pose within limits", (yaw, pitch, roll)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    paths = sys.argv[1:]
    print("Loading 3DDFA_V2 model (one-time, ~5-6s)...\n")
    estimator = get_estimator()

    for path in paths:
        verdict, reason, details = check_image(path, estimator)
        if details:
            yaw, pitch, roll = details
            print(f"{path}: {verdict}  ({reason})  [yaw={yaw:+.1f} pitch={pitch:+.1f} roll={roll:+.1f}]")
        else:
            print(f"{path}: {verdict}  ({reason})")


if __name__ == "__main__":
    main()
