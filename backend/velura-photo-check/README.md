# 3DDFA_V2 pose module (trimmed for production)

This is a stripped-down, self-contained copy of `cleardusk/3DDFA_V2`, cut
down to only the pieces needed to compute yaw/pitch/roll from a face image
plus a bounding box. It does **not** include their face detector
(FaceBoxes), the 3D mesh renderer (Sim3DR), or the demo/gradio scripts --
none of that is needed for a pose-only check, and dropping it means no
Cython build step and no extra heavy dependencies.

You supply the face box yourself (e.g. from the MediaPipe detector
`validate_photo.py` already runs) -- this module only does the pose math.

## What's in here

```
pose3d.py            <- the only file your app code should import
requirements.txt
tddfa_lite/           <- trimmed 3DDFA_V2 internals (don't import from here directly)
    TDDFA.py
    models/            (MobileNet architecture defs)
    bfm/               (3D morphable face model)
    utils/             (pose math, tensor prep)
    configs/           (mb1_120x120.yml + 3 small .pkl config files)
    weights/mb1_120x120.pth   (~14MB, the actual trained weights)
```

Total footprint: ~38MB (mostly the .pth weights file), all CPU, no GPU
required, no network access needed at runtime (everything's bundled).

## Get the model weights (not included in this zip -- too large to send as a chat attachment)

Everything here is code except 3 binary files that together are ~25MB,
which pushed this past the file-attachment size limit. They're public and
committed directly in the original repo, so grab them with a plain clone
on a machine that has normal internet access:

```bash
git clone --depth 1 https://github.com/cleardusk/3DDFA_V2
cp 3DDFA_V2/weights/mb1_120x120.pth        tddfa_lite/weights/
cp 3DDFA_V2/configs/bfm_noneck_v3.pkl      tddfa_lite/configs/
cp 3DDFA_V2/configs/tri.pkl                tddfa_lite/configs/
```

(`configs/mb1_120x120.yml` and `configs/param_mean_std_62d_120x120.pkl` are
already included in this zip -- they're tiny.)

## Install

```bash
pip install -r requirements.txt
```

(`torch`/`torchvision` CPU wheels -- no CUDA needed. If your `pip install
torch` pulls a GPU build in your environment, add
`--index-url https://download.pytorch.org/whl/cpu` to force the CPU-only
one, which is smaller and doesn't need a GPU driver.)

## How this plugs into your existing photo-validation flow

`validate_photo.py` already runs MediaPipe face detection + landmarks and
computes its own yaw/pitch/roll via `_estimate_pose()` (a cheap 2D-landmark
approximation). This module is a way to get a second, more accurate
estimate from an actual trained 3D model, using the SAME face box
`validate_photo.py` already detected -- no duplicate face detection.

```python
import cv2
from pose3d import get_estimator

# --- once, at process/app startup ---
pose_estimator = get_estimator()   # loads weights, ~6s the first time

# --- per request, inside your upload-handling endpoint ---
def check_photo(image_path, face_box):
    """face_box = (x0, y0, x1, y1) in pixels, from your existing detector."""
    img = cv2.imread(image_path)
    yaw, pitch, roll = pose_estimator.estimate(img, face_box)
    return yaw, pitch, roll
```

### Example: wiring into a Flask upload endpoint

```python
from flask import Flask, request, jsonify
import cv2
import numpy as np
from pose3d import get_estimator

app = Flask(__name__)
pose_estimator = get_estimator()          # load once at startup, not per-request

@app.route("/validate-photo", methods=["POST"])
def validate_photo_endpoint():
    file_bytes = np.frombuffer(request.files["photo"].read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # ... run your existing validate_photo.py checks to get a face box ...
    # box = (x0, y0, x1, y1)

    yaw, pitch, roll = pose_estimator.estimate(img, box)
    ok = abs(yaw) < 25 and abs(pitch) < 20 and abs(roll) < 20
    return jsonify({"pose_ok": ok, "yaw": yaw, "pitch": pitch, "roll": roll})
```

The same pattern applies to FastAPI, Django, etc. -- the important part is
`get_estimator()` being called once (module-level / app-startup), not
inside the request handler, since loading the weights takes ~6 seconds but
each inference after that is ~15ms.

## Important: this is a server-side (backend) component, not client-side

This runs as regular Python with a PyTorch model -- it's meant to run on
your backend, in the same process (or same service) that already runs
`validate_photo.py`, not in the visitor's browser. If you specifically
wanted this to run client-side in JavaScript before the photo is even
uploaded, that's a materially different project: the model would need to
be exported to ONNX and run through onnxruntime-web or converted to
TensorFlow.js, and accuracy/format quirks can appear in that conversion.
Flag it if that's actually what you meant by "from our website" and I'll
scope that separately -- it's not a small addition on top of this.

## Sign convention caveat

3DDFA_V2's yaw/pitch/roll do not necessarily share the same sign
convention as `validate_photo.py`'s own `_estimate_pose()`. If you're
running both side by side (e.g. as a second opinion rather than a
replacement), compare magnitudes, or see the calibration notes in
`validate_photo.py`'s `_estimate_pose()` docstring/comments for the exact
mapping we found (yaw and roll were mirrored; pitch had a real ~8.5deg bias
that's already been corrected in `_estimate_pose()`'s neutral-offset
constant).

## One combined verdict (recommended): validate_full.py

`test_cli.py` checks pose only. `validate_full.py` is the one to actually
trust end to end -- it runs validate_photo.py's full check suite
(resolution, blur, brightness, face count/size, forehead occlusion) AND
cross-checks head pose using 3DDFA_V2 instead of validate_photo.py's own
2D heuristic, then prints one VALID/INVALID verdict that reflects
everything.

Setup: copy your current `validate_photo.py` into this same folder (a copy
is already included, but keep it in sync with whatever version you're
actually running in production):

```bash
cp /path/to/your/validate_photo.py .
python3 validate_full.py photo1.jpg photo2.png ...
```

Example output:

```
Loading 3DDFA_V2 model (one-time, ~5-6s)...

photo1.jpg: VALID  (all checks passed)
stock_photo.jpg: INVALID  (low_resolution, face_too_small)
group_photo.jpg: INVALID  (multiple_faces, face_too_small)
landscape.jpg: INVALID  (no_face_detected)
```

This is the one to use for "is this photo actually good enough" testing.
`test_cli.py` (below) is narrower -- useful specifically when you want to
inspect the pose numbers in isolation.

## Testing from the terminal

`test_cli.py` is a ready-to-run tester -- point it at one or more image
paths, it detects the face itself (MediaPipe, same detector
`validate_photo.py` uses), runs the pose check, and prints a clean
VALID / INVALID verdict per image (checked against the same
`MAX_YAW_DEG` / `MAX_PITCH_DEG` / `MAX_ROLL_DEG` thresholds
`validate_photo.py` uses):

```bash
python3 test_cli.py path/to/photo1.jpg path/to/photo2.png ...
```

Example output:

```
Loading 3DDFA_V2 model (one-time, ~5-6s)...

photo1.jpg: VALID  (pose within limits)  [yaw=-2.2 pitch=+4.6 roll=+0.4]
photo2.jpg: VALID  (pose within limits)  [yaw=+4.1 pitch=+17.3 roll=-5.5]
group_photo.jpg: INVALID  (multiple faces detected (2))
landscape.jpg: INVALID  (no face detected)
extreme_angle.jpg: INVALID  (yaw +31.4 exceeds 25)  [yaw=+31.4 pitch=+3.2 roll=-1.1]
```

It handles bad paths, no-face images, and multi-face images gracefully --
one bad image in a batch won't stop the rest from running.

**Important scope note:** this checks *pose only*. It does not re-run
`validate_photo.py`'s other checks (blur, brightness, resolution,
forehead occlusion). A photo can show VALID here and still fail
`validate_photo.py` for an unrelated reason (e.g. it's blurry), and vice
versa -- a slightly-too-dark photo with perfect head angle would show
VALID here. This tool is specifically for testing/trusting the pose gate
in isolation; run `validate_photo.py` itself to get the full pass/fail
picture across every check.

If you just want the bare `pose3d.py` API without the CLI wrapper (e.g. you
already have a face box from elsewhere and don't want the mediapipe
dependency at all), use it directly:

```bash
python3 pose3d.py path/to/face.jpg x0 y0 x1 y1
```
