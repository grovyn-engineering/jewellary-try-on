# Builds a self-contained image for the photo pre-check API. CPU only, no
# GPU needed. Fetches the 3 large model files (~25MB, not included in this
# folder) from the public 3DDFA_V2 repo at BUILD time, so the resulting
# image is fully self-contained -- no download needed at container startup.
FROM python:3.11-slim

# opencv-python needs libgl1/libglib at runtime even though it's "headless"
# in spirit; git is only needed to fetch the 3 model files below and is
# fine to leave in the final image (small). ca-certificates is required for
# git's HTTPS clone below -- python:3.11-slim doesn't include it by
# default, and without it the clone fails with a certificate verification
# error before it ever reaches GitHub.
RUN apt-get update && apt-get install -y --no-install-recommends \
    git ca-certificates libgl1 libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# torch/torchvision from the CPU-only wheel index, installed BEFORE the
# rest of requirements.txt and as its own step. A plain `pip install torch`
# resolves to the full CUDA build (multi-GB) even though this app is
# CPU-only -- installing/unpacking that is what ran Render's build out of
# its 512MB memory limit. The CPU wheel is a fraction of the size.
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Fetch the model weight/config files this repo doesn't ship directly
# (kept out of the zip we sent you because they're large) -- if you'd
# rather not depend on network access at build time, download these
# yourself and COPY them in instead, then delete this RUN block.
#
# mkdir -p first: git does not track empty directories, so
# tddfa_lite/weights/ (which only ever held the one file excluded from the
# zip) never made it into the repo this was pushed from -- COPY . . above
# has nothing to create it from. Creating it explicitly here means this
# doesn't depend on the repo happening to have the right empty folders.
RUN mkdir -p tddfa_lite/weights tddfa_lite/configs \
    && git clone --depth 1 https://github.com/cleardusk/3DDFA_V2 /tmp/3ddfa_src \
    && cp /tmp/3ddfa_src/weights/mb1_120x120.pth   tddfa_lite/weights/ \
    && cp /tmp/3ddfa_src/configs/bfm_noneck_v3.pkl tddfa_lite/configs/ \
    && cp /tmp/3ddfa_src/configs/tri.pkl           tddfa_lite/configs/ \
    && rm -rf /tmp/3ddfa_src

EXPOSE 8000

# Single worker: the models are loaded once per process and are not
# lightweight to duplicate. If you need more throughput than one worker
# gives you, scale by running more container instances (see DEPLOY.md)
# rather than more uvicorn workers in one container.
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
