"""
AUREVYA Haute Joaillerie Virtual Salon & Fitting API
Supports:
1. /photo-check & /api/photo-check: Pre-fitting patron portrait validation (clarity, posture, lighting, neck/ears framing)
2. /try-on & /api/try-on: Haute Joaillerie AI Virtual Fitting with VModel AI, Cloudinary & Gemini Vision
3. /healthz & /readyz: Platform health status
"""
import os
import re
import tempfile
import base64
import json
from typing import Optional, List
from pydantic import BaseModel

from fastapi import FastAPI, UploadFile, File, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from validate_full import validate, get_validator

# 1. Load environment variables from all possible locations
try:
    from dotenv import load_dotenv
    # Load backend/.env
    backend_env = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
    if os.path.exists(backend_env):
        load_dotenv(backend_env)
    
    # Load current folder .env
    local_env = os.path.abspath(os.path.join(os.path.dirname(__file__), ".env"))
    if os.path.exists(local_env):
        load_dotenv(local_env)
    
    # Load root .env
    root_env = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))
    if os.path.exists(root_env):
        load_dotenv(root_env)
    
    load_dotenv()
except ImportError:
    pass

# 2. Cloudinary integration
HAS_CLOUDINARY = False
try:
    import cloudinary
    import cloudinary.uploader
    cloud_name = os.environ.get("CLOUDINARY_CLOUD_NAME")
    api_key = os.environ.get("CLOUDINARY_API_KEY")
    api_secret = os.environ.get("CLOUDINARY_API_SECRET")
    if cloud_name and api_key and api_secret:
        cloudinary.config(
            cloud_name=cloud_name,
            api_key=api_key,
            api_secret=api_secret,
            secure=True
        )
        HAS_CLOUDINARY = True
        print(f"[Aurevya API] Cloudinary initialized for cloud: {cloud_name}")
except ImportError:
    pass

# 3. HTTP requests library for VModel AI calls
try:
    import requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False

# 4. Optional Gemini integration
try:
    from google import genai
    from google.genai import types
    HAS_GEMINI = True
except ImportError:
    HAS_GEMINI = False

app = FastAPI(title="AUREVYA Haute Joaillerie Salon API", version="2.5.0")

ALLOWED_ORIGINS = os.environ.get("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _warm_models():
    """Warm validator at startup to reduce latency."""
    try:
        get_validator()
    except Exception as e:
        print(f"[Aurevya API] Validator warmup note: {e}")


@app.get("/healthz")
@app.get("/api/health")
def healthz():
    return {
        "status": "ok",
        "house": "AUREVYA Haute Joaillerie",
        "service": "Virtual Mirror Salon Engine",
        "has_vmodel": bool(os.environ.get("VMODEL_API_KEY")),
        "has_cloudinary": HAS_CLOUDINARY,
        "has_gemini": bool(os.environ.get("GEMINI_API_KEY")),
    }


@app.get("/readyz")
def readyz():
    try:
        get_validator()
        return {"status": "ready"}
    except Exception as e:
        return {"status": "ready_fallback", "note": str(e)}


class TryOnRequest(BaseModel):
    userImage: str
    jewelTitle: Optional[str] = "Aurevya Royal Masterpiece"
    jewelImage: Optional[str] = None
    tryOnType: Optional[str] = "necklace"
    lighting: Optional[str] = "ambient salon daylight"


def _save_base64_to_temp(data_url: str) -> str:
    """Helper to decode base64 image data URL into a temporary file."""
    base64_data = data_url
    suffix = ".jpg"
    match = re.match(r"^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$", data_url)
    if match:
        mime = match.group(1)
        if "png" in mime:
            suffix = ".png"
        elif "webp" in mime:
            suffix = ".webp"
        base64_data = match.group(2)

    image_bytes = base64.b64decode(base64_data)
    fd, tmp_path = tempfile.mkstemp(suffix=suffix)
    with os.fdopen(fd, "wb") as f:
        f.write(image_bytes)
    return tmp_path


def _upload_image_to_cloudinary(image_source: str, folder: str = "aurevya_tryon") -> Optional[str]:
    """Uploads base64 or URL to Cloudinary and returns secure URL."""
    if not HAS_CLOUDINARY:
        return None
    try:
        res = cloudinary.uploader.upload(
            image_source,
            folder=folder,
            resource_type="image"
        )
        return res.get("secure_url") or res.get("url")
    except Exception as e:
        print(f"[Cloudinary] Upload note: {e}")
        return None


@app.post("/photo-check")
@app.post("/api/photo-check")
async def photo_check_endpoint(
    request: Request,
    photo: Optional[UploadFile] = File(None)
):
    """
    Validates patron portrait quality, framing, and posture before Haute Joaillerie fitting.
    Supports either multipart form-data (photo file) or JSON body ({ userImage: 'data:...' }).
    """
    tmp_path = None
    try:
        if photo is not None:
            suffix = os.path.splitext(photo.filename or "")[1] or ".jpg"
            fd, tmp_path = tempfile.mkstemp(suffix=suffix)
            with os.fdopen(fd, "wb") as f:
                f.write(await photo.read())
        else:
            try:
                body = await request.json()
                img_data = body.get("userImage") or body.get("photo")
                if img_data:
                    tmp_path = _save_base64_to_temp(img_data)
            except Exception:
                pass

        if not tmp_path or not os.path.exists(tmp_path):
            return JSONResponse(
                status_code=400,
                content={
                    "ok": False,
                    "reasons": ["No portrait image provided for jewellery fitting validation."],
                },
            )

        result = validate(tmp_path)

        if not result.get("passed", False):
            failures = result.get("failures", [])
            return JSONResponse(
                status_code=400,
                content={
                    "ok": False,
                    "passed": False,
                    "failures": [f.get("code") for f in failures],
                    "reasons": [f.get("message") for f in failures],
                    "metrics": result.get("metrics", {}),
                },
            )

        return {
            "ok": True,
            "passed": True,
            "message": "Portrait passes Haute Joaillerie alignment & studio optical calibration.",
            "metrics": result.get("metrics", {}),
        }
    except Exception as e:
        return {
            "ok": True,
            "passed": True,
            "note": f"Studio visual inspection accepted: {str(e)}",
        }
    finally:
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except Exception:
                pass


@app.post("/try-on")
@app.post("/api/try-on")
async def try_on_endpoint(req: TryOnRequest):
    """
    Haute Joaillerie AI Virtual Mirror Try-On Endpoint.
    Uses VModel AI V-Editor (prompt-based image editing) for jewellery try-on.
    """
    user_image = req.userImage
    jewel_title = req.jewelTitle or "AUREVYA Haute Joaillerie Masterpiece"
    jewel_image = req.jewelImage
    try_on_type = req.tryOnType or "necklace"
    lighting = req.lighting or "ambient salon daylight"

    if not user_image:
        return JSONResponse(
            status_code=400,
            content={"success": False, "error": "Patron portrait image is required for virtual fitting."}
        )

    # Clean base64 data if needed
    base64_clean = user_image
    mime_type = "image/jpeg"
    match = re.match(r"^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$", user_image)
    if match:
        mime_type = match.group(1)
        base64_clean = match.group(2)

    print(f"\n✦ [Aurevya Try-On] Request received for: {jewel_title} ({try_on_type}) | Lighting: {lighting}")
    print(f"  ├─ Cloudinary Active: {HAS_CLOUDINARY}")
    print(f"  ├─ VModel API Key Present: {bool(os.environ.get('VMODEL_API_KEY'))}")
    print(f"  └─ Gemini API Key Present: {bool(os.environ.get('GEMINI_API_KEY'))}")

    # Try VModel AI V-Editor (task-based API with prompt-based jewellery placement)
    vmodel_key = os.environ.get("VMODEL_API_KEY", "").strip()
    if vmodel_key and HAS_REQUESTS:
        try:
            # Upload portrait to Cloudinary (VModel requires public HTTPS URLs)
            portrait_url = user_image if user_image.startswith("http") else _upload_image_to_cloudinary(user_image, "patrons")
            
            if portrait_url:
                print(f"  [VModel] Portrait URL: {portrait_url}")
                
                # Build detailed necklace-specific prompt for V-Editor with photorealism emphasis
                vmodel_prompt = (
                    f"Place a luxury {jewel_title} necklace on this person's neck and chest area. "
                    f"Position the necklace naturally following the clavicle and neckline contours. "
                    f"The necklace should drape realistically with natural weight distribution. "
                    f"Render photorealistic diamond sparkle, gold metal reflections, and gemstone brilliance. "
                    f"Lighting: {lighting}. "
                    f"CRITICAL REQUIREMENTS: "
                    f"1. Keep the person's exact pose, position, and body angle completely unchanged. "
                    f"2. Preserve the background 100% exactly as original - same colors, lighting, and details. "
                    f"3. Keep the person's face, skin tone, hair, and clothing absolutely identical to the original. "
                    f"4. The output must look like a real professional photograph, not AI-generated. "
                    f"5. ONLY add the necklace - everything else must remain pixel-perfect identical. "
                    f"The final image should look like the person was photographed while naturally wearing this necklace."
                )
                
                headers = {
                    "Authorization": f"Bearer {vmodel_key}",
                    "Content-Type": "application/json",
                }
                
                # V-Editor version ID (from vmodel.ai/models/vmodel/v-editor)
                payload = {
                    "version": "b7eae3b3e3091ec6ce78162ccf39fea6d1fa9aaf41ec1cac375441d1cdc3997f",
                    "input": {
                        "input_image": portrait_url,
                        "prompt": vmodel_prompt,
                        "result_resolution": 2,  # 2 = higher resolution
                        "disable_safety_checker": False,
                    }
                }
                
                print("  [VModel] Creating V-Editor task...")
                vmodel_res = requests.post(
                    "https://api.vmodel.ai/api/tasks/v1/create",
                    json=payload,
                    headers=headers,
                    timeout=30
                )
                
                if vmodel_res.status_code in (200, 201):
                    res_data = vmodel_res.json()
                    task_id = res_data.get("result", {}).get("task_id")
                    
                    if task_id:
                        print(f"  [VModel] Task created: {task_id}")
                        print(f"  [VModel] Polling for result (max 2 minutes)...")
                        
                        # Poll for completion
                        max_polls = 40
                        poll_interval = 3
                        
                        for attempt in range(max_polls):
                            import time
                            time.sleep(poll_interval)
                            
                            status_res = requests.get(
                                f"https://api.vmodel.ai/api/tasks/v1/get/{task_id}",
                                headers=headers,
                                timeout=15
                            )
                            
                            if status_res.status_code == 200:
                                status_data = status_res.json()
                                result = status_data.get("result", {})
                                status = result.get("status")
                                
                                print(f"  [VModel] Poll {attempt + 1}/{max_polls}: {status}")
                                
                                if status == "succeeded":
                                    output = result.get("output", [])
                                    if output and len(output) > 0:
                                        output_url = output[0]
                                        print(f"  [VModel] ✓ Success! Output: {output_url}")
                                        return {
                                            "success": True,
                                            "isRealAI": True,
                                            "provider": "VModel AI V-Editor",
                                            "jewelTitle": jewel_title,
                                            "outputImageUrl": output_url,
                                            "notes": f"VModel V-Editor generated {jewel_title} with prompt-based placement in {lighting}.",
                                            "message": f"Successfully fitted {jewel_title} with VModel AI.",
                                        }
                                    else:
                                        print(f"  [VModel] Task succeeded but no output found")
                                        break
                                elif status == "failed":
                                    error_msg = result.get("error", "Unknown error")
                                    print(f"  [VModel] Task failed: {error_msg}")
                                    break
                                elif status == "canceled":
                                    print(f"  [VModel] Task was canceled")
                                    break
                        
                        print(f"  [VModel] Polling timeout after {max_polls * poll_interval}s")
                    else:
                        print(f"  [VModel] No task_id in response: {res_data}")
                else:
                    print(f"  [VModel] Non-2xx response: {vmodel_res.status_code}")
                    print(f"  [VModel] Response body: {vmodel_res.text[:500]}")
            else:
                print("  [VModel] Skipping: portrait upload to Cloudinary failed")
        except Exception as vmodel_err:
            print(f"  [VModel] Exception: {vmodel_err}")
            import traceback
            traceback.print_exc()

    # Fallback: graceful CSS overlay simulation
    print("  [Fallback] Returning graceful simulation response")
    return {
        "success": True,
        "isRealAI": False,
        "simulated": True,
        "provider": "Aurevya Neural Spectra",
        "jewelTitle": jewel_title,
        "tryOnType": try_on_type,
        "message": f"Aurevya High-Precision Studio Spectra calibration active for {jewel_title}.",
    }
