# Handoff: photo pre-check gate for Velura's hair try-on upload flow

## What this is

Before a user's photo goes into the hair try-on pipeline (bangs compositing,
Nano Banana generation), it needs to pass a set of automated checks so we
don't waste a generation call -- or show a bad result -- on a photo that's
too dark, blurry, wrongly framed, or at too extreme an angle. This package
is that check, ready to wire into the upload endpoint.

**Read the blocking issue at the very bottom before you integrate this.**
It's not a nice-to-have caveat -- it changes whether this is safe to ship.

## What to call

One function. Everything else in this package is internal to it.

```python
from validate_full import validate

result = validate("/path/to/uploaded_photo.jpg")
# {
#   "passed": bool,
#   "failures": [{"code": "too_blurry", "message": "..."}, ...],
#   "metrics": {...},          # raw numbers, useful for logging/debugging
#   "pose_source": "3ddfa_v2", # or a fallback string, see below
# }
```

`validate()` takes a **file path** (something already saved to disk --
save the upload to a temp path first if it arrives as bytes/stream). It
lazy-loads both underlying models on first call and reuses them after
that, so don't call it in a way that re-imports the module per request
(normal `import` caching handles this fine in a standard WSGI/ASGI app).

### Recommended: warm the models at app startup

Model load is ~6 seconds (mostly the 3DDFA_V2 weights). You don't want the
first user's upload to eat that latency. Call this once when your app
boots:

```python
from validate_full import get_validator
get_validator()   # pays the ~6s load cost now, not on request #1
```

### Example: Flask endpoint

```python
from flask import Flask, request, jsonify
from validate_full import validate, get_validator
import tempfile, os

app = Flask(__name__)
get_validator()  # warm at startup

@app.route("/api/photo-check", methods=["POST"])
def photo_check():
    f = request.files["photo"]
    fd, tmp_path = tempfile.mkstemp(suffix=os.path.splitext(f.filename)[1])
    os.close(fd)
    f.save(tmp_path)
    try:
        result = validate(tmp_path)
    finally:
        os.remove(tmp_path)

    if not result["passed"]:
        return jsonify({
            "ok": False,
            "reasons": [f["message"] for f in result["failures"]],
        }), 400
    return jsonify({"ok": True})
```

Same pattern for FastAPI/Django -- the only requirement is "load once at
startup, call `validate(path)` per request."

## What "passed" actually checks

All of these, combined into one verdict:

- **Resolution**: rejects anything under 400x400px (`low_resolution`)
- **Blur**: measured at the eyes specifically, so studio-retouched photos
  don't get misread as blurry (`too_blurry`)
- **Brightness**: too dark or overexposed (`too_dark`, `overexposed`)
- **Face count**: exactly one face required (`no_face_detected`,
  `multiple_faces`)
- **Face size in frame**: too small (e.g. a full-body shot) or too large
  (`face_too_small`, `face_too_large`)
- **Head pose**: yaw/pitch/roll within limits (currently 25/20/20
  degrees), decided by 3DDFA_V2 rather than a cheaper 2D approximation
  (`head_turned`, `head_tilted`, `head_pitched`)
- **Forehead occlusion**: hat/hood/hair covering the hairline
  (`forehead_occluded`)

Full failure-code list and thresholds are in `validate_photo.py` itself
(the constants near the top of the file) and the pose thresholds
duplicated at the top of `validate_full.py` -- **keep those two in sync if
you ever tune one.**

## Setup before this runs anywhere

1. `pip install -r requirements.txt` (torch/torchvision are CPU-only, no
   GPU needed; mediapipe is pinned to 0.10.14 -- newer versions removed an
   API this depends on, don't let that float).
2. Fetch 3 model files not included in this package (~25MB total, see
   `README.md` for the exact `git clone` + `cp` commands) and place them in
   `tddfa_lite/weights/` and `tddfa_lite/configs/`.
3. Make sure the `validate_photo.py` sitting next to `validate_full.py` in
   this folder is the current production version -- if it's been updated
   since this handoff, replace it before deploying.
4. Run `python3 validate_full.py some_test_photo.jpg` locally first to
   confirm the whole chain works before wiring it into the endpoint.

## Known limitations / things not to over-trust

- **Pose accuracy**: even with the 3DDFA_V2 cross-check, expect roughly
  +/-3.5 degree noise on yaw/pitch/roll -- it's a real trained model, not
  ground truth. Don't treat a photo that's 2-3 degrees over threshold as
  a hard, unambiguous reject; it may be borderline.
- **Very dense crowd photos**: two test images with 20-30+ small faces in
  a tight group still came back `no_face_detected` even after the
  detection fix that solved the earlier group-photo problem. Unlikely to
  matter for actual selfie uploads, but noting it since it's a real,
  unresolved gap in coverage.
- **Blur threshold is provisional**: `EYE_BLUR_MIN_VARIANCE` in
  `validate_photo.py` has never been validated against a genuinely blurry
  real-world upload (only against retouched/sharp studio photos it was
  tuned to stop mis-flagging). Watch false-negative reports here after
  launch.
- **`pose_source` field**: normally reads `"3ddfa_v2"`. If it instead says
  something like `"3ddfa failed (...)"` or `"fell back to
  validate_photo.py pose"`, the 3DDFA cross-check didn't run for that
  request and the verdict fell back to the older 2D heuristic. Worth
  logging/alerting on if that shows up in production -- it means
  something's wrong with the 3DDFA setup on that machine, not with the
  photo.

## Blocking issue -- do not skip this

**This check has no concept of the age of the person in the photo, and
was never asked to.** During testing, a photo that clearly showed a child
passed every check here (resolution, blur, pose, everything) -- because
none of these checks are about who's in the photo, only about image
quality and framing.

This pipeline sends a validated photo into an AI image-generation model to
produce an altered image of the person in it. Letting a photo of a minor
through that flow is a real legal and safety problem, not an edge case to
patch with another CV heuristic. **Do not wire this endpoint into a public
upload flow until there's an actual age-gating/consent mechanism at the
account or ToS layer** (e.g. explicit 18+ attestation at signup, tied to
the account, not inferred from the photo). That's a product/legal
decision that needs to happen above this code, not inside it -- flag it to
whoever owns that call before this ships.
