"""
Photo pre-check gate for the hair try-on flow.

Runs BEFORE the photo is sent to the Nano Banana / Gemini image-edit call,
so customers get an immediate, specific rejection reason instead of a
silently bad AI-generated result.

Checks implemented (see conversation history for the full rationale of
each): face count, face size/framing, head pose, blur, brightness,
detection confidence, and a lightweight occlusion heuristic. Content
moderation is NOT implemented here -- that should stay a hosted API
(AWS Rekognition / Google SafeSearch / Azure Content Safety) rather than
something built in an afternoon.

Usage:
    python validate_photo.py <photo.jpg>

As a library:
    from validate_photo import validate_photo
    result = validate_photo("photo.jpg")
    if not result["passed"]:
        # result["failures"] is a list of {code, message} the frontend can show directly
        ...
"""
import sys
import cv2
import numpy as np
import mediapipe as mp

try:
    mp_face_mesh = mp.solutions.face_mesh
    mp_face_detection = mp.solutions.face_detection
except (AttributeError, ModuleNotFoundError):
    try:
        from mediapipe.python.solutions import face_mesh as mp_face_mesh
        from mediapipe.python.solutions import face_detection as mp_face_detection
    except Exception:
        mp_face_mesh = None
        mp_face_detection = None

LEFT_TEMPLE, RIGHT_TEMPLE, FOREHEAD_CENTER, CHIN = 234, 454, 10, 152
LEFT_EYEBROW_TOP, RIGHT_EYEBROW_TOP = 105, 334
LEFT_EYE_OUTER, RIGHT_EYE_OUTER = 33, 263
NOSE_TIP = 1

# Full eye contours (lids + lashes), used for a retouch-proof blur check --
# skin retouching smooths skin texture but never touches the eyes/lashes,
# so sharpness measured here reflects genuine optical/motion blur, not the
# photo-editing style of the source image.
LEFT_EYE_RING = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
RIGHT_EYE_RING = [263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466]

# ---- tunable thresholds -----------------------------------------------
MIN_RESOLUTION = (400, 400)          # px, (width, height)
FACE_AREA_MIN_FRAC = 0.06            # face bbox area / image area
FACE_AREA_MAX_FRAC = 0.70
MAX_YAW_DEG = 25
MAX_ROLL_DEG = 20
MAX_PITCH_DEG = 20
BLUR_MIN_VARIANCE = 60.0             # legacy whole-face threshold; kept only for the diagnostic metric
EYE_BLUR_MIN_VARIANCE = 25.0         # authoritative blur check -- eye-region Laplacian variance (retouch-proof); TUNE against real photos
BRIGHTNESS_MIN = 55                  # mean V, 0-255
BRIGHTNESS_MAX = 200
MIN_DETECTION_CONFIDENCE = 0.5
FOREHEAD_OCCLUSION_MAX_DARK_FRAC = 0.6   # forehead region overwhelmingly dark -> hat/hair
# -------------------------------------------------------------------------


def _laplacian_variance(gray, target_width=400):
    """Laplacian variance is NOT scale-invariant -- the same sharp edges
    produce a lower raw variance in a high-resolution image than in a
    lower-resolution one, because the edge gradient is spread over more
    pixels. Without normalizing, a fixed threshold either falsely rejects
    high-res sharp photos or lets through low-res blurry ones. Resize to a
    consistent width first so the metric is comparable across photos."""
    h, w = gray.shape[:2]
    if w == 0 or h == 0:
        return 0.0
    if w != target_width:
        scale = target_width / w
        gray = cv2.resize(gray, (target_width, max(1, int(h * scale))), interpolation=cv2.INTER_AREA)
    return cv2.Laplacian(gray, cv2.CV_64F).var()


def _estimate_pose(pts, img_w, img_h):
    """Rough yaw/pitch/roll from 2D landmark geometry (no 3D solvePnP model
    needed for a pass/fail gate -- good enough to catch extreme angles)."""
    left_eye, right_eye = pts[LEFT_EYE_OUTER], pts[RIGHT_EYE_OUTER]
    nose = pts[NOSE_TIP]
    left_t, right_t = pts[LEFT_TEMPLE], pts[RIGHT_TEMPLE]

    roll = np.degrees(np.arctan2(right_eye[1] - left_eye[1], right_eye[0] - left_eye[0]))

    eye_mid = (left_eye + right_eye) / 2.0
    face_width = np.linalg.norm(right_t - left_t)
    # nose horizontal offset from the eye midpoint, normalized by face width,
    # is a cheap proxy for yaw (turning the head left/right)
    yaw_proxy = (nose[0] - eye_mid[0]) / (face_width + 1e-6)
    yaw = np.degrees(np.arctan2(yaw_proxy, 0.5))

    forehead, chin = pts[FOREHEAD_CENTER], pts[CHIN]
    face_height = np.linalg.norm(chin - forehead)
    # neutral offset recalibrated against 3DDFA_V2's 3DMM-derived pitch on
    # 17 single-face reference images (mean bias -8.5deg at the old 0.28
    # constant, corrected value 0.205, residual noise ~3.5deg after fix)
    pitch_proxy = (nose[1] - eye_mid[1]) / (face_height + 1e-6) - 0.205  # ~neutral offset
    pitch = np.degrees(np.arctan2(pitch_proxy, 0.5))

    return yaw, pitch, roll


def _forehead_occlusion_fraction(gray, pts):
    """Crude occlusion check: sample the forehead band between the hairline
    landmark and the eyebrows, and flag if it's overwhelmingly dark (hat
    brim, hair fully covering forehead, heavy shadow)."""
    forehead = pts[FOREHEAD_CENTER]
    brow_mid = (pts[LEFT_EYEBROW_TOP] + pts[RIGHT_EYEBROW_TOP]) / 2.0
    left_t, right_t = pts[LEFT_TEMPLE], pts[RIGHT_TEMPLE]
    face_width = np.linalg.norm(right_t - left_t)

    x0 = int(min(left_t[0], right_t[0]))
    x1 = int(max(left_t[0], right_t[0]))
    y0 = int(forehead[1] - 0.05 * face_width)
    y1 = int(brow_mid[1])
    h, w = gray.shape
    x0, x1 = max(0, x0), min(w, x1)
    y0, y1 = max(0, y0), min(h, y1)
    if x1 <= x0 or y1 <= y0:
        return 0.0
    band = gray[y0:y1, x0:x1]
    dark_frac = float((band < 60).mean())
    return dark_frac


def _eye_region_sharpness(gray, pts, w, h, pad_frac=0.6):
    """Blur signal measured at the eyes specifically. Eyelashes and the
    iris/sclera boundary are the highest-frequency detail on a face and are
    never touched by skin-retouching -- so if this region is sharp, the
    photo is in focus, even if the skin elsewhere has been smoothed by a
    studio retoucher. Returns the max of the two eyes' variance (only one
    needs to be sharp -- e.g. a slight 3/4 angle can soft-focus one eye)."""
    variances = []
    for ring in (LEFT_EYE_RING, RIGHT_EYE_RING):
        eye_pts = pts[ring]
        x0, x1 = eye_pts[:, 0].min(), eye_pts[:, 0].max()
        y0, y1 = eye_pts[:, 1].min(), eye_pts[:, 1].max()
        pad_x = (x1 - x0) * pad_frac
        pad_y = (y1 - y0) * pad_frac + (x1 - x0) * 0.15  # eyes are wide+flat; pad y more
        ex0, ex1 = int(max(0, x0 - pad_x)), int(min(w, x1 + pad_x))
        ey0, ey1 = int(max(0, y0 - pad_y)), int(min(h, y1 + pad_y))
        if ex1 <= ex0 or ey1 <= ey0:
            continue
        crop = gray[ey0:ey1, ex0:ex1]
        if crop.size == 0:
            continue
        # normalize to a consistent eye-crop width so the metric doesn't
        # depend on source resolution (same reasoning as the whole-face check)
        variances.append(_laplacian_variance(crop, target_width=150))
    return max(variances) if variances else 0.0


def _detect_faces_full_range(img_rgb, min_confidence):
    """Stage 1: robust presence/count check.

    mp.solutions.face_mesh.FaceMesh's BUILT-IN detector is the "short-range"
    model (model_selection=0), tuned for close-up selfie framing -- it
    reliably MISSES faces in group photos, wider shots, or any frame where
    faces are a smaller fraction of the image. Confirmed directly: on a
    sharp, well-lit, color group photo with 6 obvious faces, FaceMesh found
    zero even at min_detection_confidence as low as 0.1. Switching to the
    "full-range" model (model_selection=1) found 4 of them immediately.

    So face COUNT and PRESENCE are decided here, with the full-range model.
    FaceMesh is only used afterward (stage 2, see _refine_landmarks) to get
    precise landmarks on an already-cropped, face-filling region -- which
    also happens to be exactly the framing FaceMesh's own detector is good
    at, so cropping first fixes the short-range weakness rather than just
    working around it."""
    h, w = img_rgb.shape[:2]
    with mp_face_detection.FaceDetection(
        model_selection=1, min_detection_confidence=min_confidence,
    ) as fd:
        results = fd.process(img_rgb)
    boxes = []
    if results.detections:
        for det in results.detections:
            bb = det.location_data.relative_bounding_box
            x0 = max(0, bb.xmin) * w
            y0 = max(0, bb.ymin) * h
            bw = bb.width * w
            bh = bb.height * h
            boxes.append((x0, y0, x0 + bw, y0 + bh))
    return boxes


def _refine_landmarks(img_bgr, box, min_confidence, pad_frac=0.6):
    """Stage 2: crop generously around a stage-1 detection box and run
    FaceMesh on just that crop to get precise landmarks. Cropping makes the
    face fill much more of the frame, which is exactly the framing
    FaceMesh's short-range detector handles well -- landmark coordinates
    are translated back to full-image pixel space before returning so every
    downstream geometry check is unaffected."""
    h, w = img_bgr.shape[:2]
    x0, y0, x1, y1 = box
    bw, bh = x1 - x0, y1 - y0
    cx0 = int(max(0, x0 - bw * pad_frac))
    cy0 = int(max(0, y0 - bh * pad_frac))
    cx1 = int(min(w, x1 + bw * pad_frac))
    cy1 = int(min(h, y1 + bh * pad_frac))
    if cx1 <= cx0 or cy1 <= cy0:
        return None
    crop = img_bgr[cy0:cy1, cx0:cx1]
    with mp_face_mesh.FaceMesh(
        static_image_mode=True, max_num_faces=1, refine_landmarks=True,
        min_detection_confidence=min_confidence,
    ) as fm:
        results = fm.process(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB))
    if not results.multi_face_landmarks:
        return None
    ch, cw = crop.shape[:2]
    lm = results.multi_face_landmarks[0].landmark
    pts = np.array([(p.x * cw + cx0, p.y * ch + cy0) for p in lm], dtype=np.float32)
    return pts


def _face_crop_box(pts, w, h, pad_frac=0.15):
    """Bounding box around the face landmarks, padded a bit, clamped to the
    image. Used to measure blur/brightness on the FACE, not the whole
    frame -- a photo can have a perfectly sharp, well-lit face in front of
    an intentionally blurred/dark background (portrait mode is extremely
    common) and that must not fail these checks."""
    xs, ys = pts[:, 0], pts[:, 1]
    x0, x1 = xs.min(), xs.max()
    y0, y1 = ys.min(), ys.max()
    pad_x = (x1 - x0) * pad_frac
    pad_y = (y1 - y0) * pad_frac
    x0, x1 = int(max(0, x0 - pad_x)), int(min(w, x1 + pad_x))
    y0, y1 = int(max(0, y0 - pad_y)), int(min(h, y1 + pad_y))
    return x0, y0, x1, y1


def validate_photo(path):
    failures = []
    img = cv2.imread(path, cv2.IMREAD_COLOR)
    if img is None:
        return {"passed": False, "failures": [
            {"code": "unreadable_file", "message": "Could not read this file. Please upload a JPG or PNG photo."}
        ]}

    h, w = img.shape[:2]
    if w < MIN_RESOLUTION[0] or h < MIN_RESOLUTION[1]:
        failures.append({"code": "low_resolution",
                          "message": f"Photo is too small ({w}x{h}px). Please upload at least {MIN_RESOLUTION[0]}x{MIN_RESOLUTION[1]}px."})

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # face detection -- run BEFORE blur/brightness, since those checks need
    # to be measured on the face region, not the whole frame (a blurred
    # background or a bright/dark backdrop must not affect the result).
    # Two stages: full-range detector decides presence/count (robust to
    # group/wide photos), then FaceMesh refines landmarks on a crop around
    # the (largest, if multiple) detection.
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    boxes = _detect_faces_full_range(img_rgb, MIN_DETECTION_CONFIDENCE)

    if not boxes:
        # no face to crop to -- fall back to whole-frame blur/brightness
        # just so the response still carries useful diagnostic metrics
        blur_var = _laplacian_variance(gray)
        mean_brightness = float(gray.mean())
        failures.append({"code": "no_face_detected",
                          "message": "We couldn't detect a face in this photo. Please upload a clear, front-facing photo of yourself."})
        return {"passed": False, "failures": failures, "metrics": {
            "resolution": (w, h), "blur_variance": blur_var, "brightness": mean_brightness,
        }}

    if len(boxes) > 1:
        failures.append({"code": "multiple_faces",
                          "message": "We detected more than one face. Please upload a photo with just yourself in frame."})

    # refine on the largest detected box (most likely to be the intended subject)
    largest_box = max(boxes, key=lambda b: (b[2] - b[0]) * (b[3] - b[1]))
    pts = _refine_landmarks(img, largest_box, MIN_DETECTION_CONFIDENCE)

    if pts is None:
        # stage-1 found a face-shaped region but FaceMesh couldn't land
        # precise landmarks on the crop (rare -- e.g. extreme profile).
        # Fall back to the stage-1 box itself for the checks that don't
        # need fine landmarks, and skip pose/occlusion which do.
        blur_var = _laplacian_variance(gray)
        mean_brightness = float(gray.mean())
        failures.append({"code": "no_face_detected",
                          "message": "We couldn't get a clear enough read on your face. Please upload a clearer, more front-facing photo."})
        return {"passed": False, "failures": failures, "metrics": {
            "resolution": (w, h), "blur_variance": blur_var, "brightness": mean_brightness,
            "num_faces_detected_stage1": len(boxes),
        }}

    # brightness: measured on the face crop (skin/overall exposure is the
    # right signal here, retouching doesn't affect it)
    fx0, fy0, fx1, fy1 = _face_crop_box(pts, w, h)
    face_gray = gray[fy0:fy1, fx0:fx1]
    mean_brightness = float(face_gray.mean()) if face_gray.size else 0.0

    # blur: measured at the eyes specifically (see _eye_region_sharpness) so
    # a studio-retouched/smoothed-skin photo doesn't get misread as blurry.
    # Whole-face variance is still computed and reported for diagnostics,
    # but the eye metric is what the pass/fail decision uses.
    whole_face_blur_var = _laplacian_variance(face_gray) if face_gray.size else 0.0
    eye_blur_var = _eye_region_sharpness(gray, pts, w, h)
    blur_var = eye_blur_var

    if blur_var < EYE_BLUR_MIN_VARIANCE:
        failures.append({"code": "too_blurry",
                          "message": "Portrait focus is soft or blurry. Please retake with a clear, steady focus to render intricate gemstone facets and metal lustres accurately."})

    if mean_brightness < BRIGHTNESS_MIN:
        failures.append({"code": "too_dark",
                          "message": "Lighting is too dim. Please retake in bright ambient light to ensure accurate diamond refraction and gold highlights."})
    elif mean_brightness > BRIGHTNESS_MAX:
        failures.append({"code": "overexposed",
                          "message": "Portrait is overexposed. Please retake with balanced salon lighting."})

    left_t, right_t = pts[LEFT_TEMPLE], pts[RIGHT_TEMPLE]
    face_width_px = np.linalg.norm(right_t - left_t)
    forehead, chin = pts[FOREHEAD_CENTER], pts[CHIN]
    face_height_px = np.linalg.norm(chin - forehead)
    face_area_frac = (face_width_px * face_height_px) / (w * h)

    if face_area_frac < FACE_AREA_MIN_FRAC:
        failures.append({"code": "face_too_small",
                          "message": "Portrait is too far away. Please frame head and neckline closer for high jewellery calibration."})
    elif face_area_frac > FACE_AREA_MAX_FRAC:
        failures.append({"code": "face_too_large",
                          "message": "Portrait is framed too closely. Please step back slightly to ensure your neckline, collarbones, and ears are in frame."})

    yaw, pitch, roll = _estimate_pose(pts, w, h)
    if abs(yaw) > MAX_YAW_DEG:
        failures.append({"code": "head_turned",
                          "message": "Head is turned at an extreme angle. Please face more towards the camera for symmetrical jewel draping."})
    if abs(roll) > MAX_ROLL_DEG:
        failures.append({"code": "head_tilted",
                          "message": "Head is tilted. Please keep your head level for balanced necklace & earring perspective."})
    if abs(pitch) > MAX_PITCH_DEG:
        failures.append({"code": "head_pitched",
                          "message": "Please look directly at the camera with a level chin for accurate clavicle/necklace alignment."})

    occlusion_frac = _forehead_occlusion_fraction(gray, pts)
    if occlusion_frac > FOREHEAD_OCCLUSION_MAX_DARK_FRAC:
        failures.append({"code": "forehead_occluded",
                          "message": "Upper face or forehead is covered. Please ensure face and neckline are clear for jewel fitting."})

    return {
        "passed": len(failures) == 0,
        "failures": failures,
        "metrics": {
            "resolution": (w, h),
            "eye_blur_variance": round(blur_var, 1),
            "whole_face_blur_variance": round(whole_face_blur_var, 1),
            "brightness": round(mean_brightness, 1),
            "face_area_frac": round(float(face_area_frac), 3),
            "yaw_deg": round(float(yaw), 1),
            "pitch_deg": round(float(pitch), 1),
            "roll_deg": round(float(roll), 1),
            "forehead_dark_frac": round(occlusion_frac, 3),
            "num_faces": len(boxes),
        },
    }


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    import json
    result = validate_photo(sys.argv[1])
    print(json.dumps(result, indent=2))
