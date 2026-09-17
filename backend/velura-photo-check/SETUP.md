# AUREVYA Virtual Try-On Backend Setup

## Quick Start

### 1. Install Dependencies

```bash
cd backend/velura-photo-check
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### 2. Configure API Keys

Edit `backend/.env` and add your API keys:

```env
# Required for AI try-on (choose at least one):
FASHN_API_KEY=your_fashn_key_here
VMODEL_API_KEY=your_vmodel_key_here

# Required for image hosting:
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Run the Backend

```bash
uvicorn app:app --host 127.0.0.1 --port 8000 --reload
```

The API will be available at `http://127.0.0.1:8000`

---

## API Provider Setup

### Option 1: FASHN AI (Recommended for Jewellery)

**Best for:** Realistic jewellery and accessories try-on with proper garment fitting.

1. Sign up at https://fashn.ai
2. Navigate to API settings and generate an API key
3. Add to `.env`:
   ```
   FASHN_API_KEY=fashn_xxxxxxxxxxxxx
   ```

**Pricing:** ~$0.023/image at 2K resolution (balanced mode)

**Features:**
- Dedicated jewellery/accessories category
- High-fidelity product placement
- 2K/4K resolution support
- Fast generation (~25s for balanced/2K)

---

### Option 2: VModel AI (V-Editor)

**Best for:** Prompt-based image editing when garment image is unavailable.

1. Sign up at https://vmodel.ai
2. Get your API key from the dashboard
3. Add to `.env`:
   ```
   VMODEL_API_KEY=vmodel_xxxxxxxxxxxxx
   ```

**Pricing:** ~$0.01/image at 1024x1024

**Features:**
- Prompt-based editing ("add diamond necklace")
- Fast processing (~4s)
- Lower cost per image

**Note:** VModel's V-Editor is a general image editor, not a dedicated try-on model. Results may vary for jewellery placement.

---

### Cloudinary Setup (Required)

Both FASHN and VModel require **public HTTPS URLs** for images. Cloudinary hosts uploaded images and provides these URLs.

1. Sign up at https://cloudinary.com (free tier: 25GB storage)
2. Go to **Dashboard** → copy your credentials
3. Add to `.env`:
   ```
   CLOUDINARY_CLOUD_NAME=dxxxxxx
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxx
   ```

---

## API Endpoints

### `POST /api/photo-check`

Validates portrait quality before try-on.

**Request:**
```json
{
  "userImage": "data:image/jpeg;base64,/9j/4AAQ..."
}
```

**Response:**
```json
{
  "ok": true,
  "passed": true,
  "message": "Portrait passes Haute Joaillerie alignment & studio optical calibration."
}
```

---

### `POST /api/try-on`

Generates AI virtual try-on image.

**Request:**
```json
{
  "userImage": "data:image/jpeg;base64,/9j/4AAQ...",
  "jewelTitle": "The Noor-E-Nizam",
  "jewelImage": "https://images.unsplash.com/photo-xyz",
  "tryOnType": "necklace",
  "lighting": "daylight"
}
```

**Response (success):**
```json
{
  "success": true,
  "isRealAI": true,
  "provider": "FASHN AI",
  "jewelTitle": "The Noor-E-Nizam",
  "outputImageUrl": "https://api.fashn.ai/output/xyz.jpg",
  "notes": "FASHN AI Virtual Try-On generated...",
  "message": "Successfully fitted The Noor-E-Nizam with FASHN AI."
}
```

---

## Provider Priority

The backend tries providers in this order:

1. **FASHN AI** (if `FASHN_API_KEY` is set and `jewelImage` is provided)
2. **VModel V-Editor** (if `VMODEL_API_KEY` is set)
3. **Gemini Vision** (if `GEMINI_API_KEY` is set - experimental text assessment only)
4. **Graceful fallback** (returns success with `simulated: true`)

---

## Troubleshooting

### Backend returns `simulated: true`

No AI provider keys are configured. Add at least one:
- `FASHN_API_KEY` (recommended)
- `VMODEL_API_KEY` (alternative)

### VModel returns 404

VModel doesn't have a `/virtual-try-on` endpoint. The backend now uses the correct task-based API with V-Editor.

### FASHN times out

FASHN Try-On Max takes 15–60 seconds depending on resolution and generation mode. The backend polls for up to 3 minutes (60 polls × 3s).

### Cloudinary upload fails

Check your credentials in `backend/.env`. The free tier allows 25GB storage and 25k transformations/month.

---

## Performance Tips

- **FASHN**: Use `generation_mode: "fast"` + `resolution: "1k"` for ~10s generation
- **VModel**: Already optimized (~4s per image)
- **Cloudinary**: Images are cached — repeated requests use the same URL

---

## Cost Estimates

### FASHN (per image)
- 1K fast: $0.012
- 2K balanced: $0.023 ✅ (recommended)
- 4K quality: $0.045

### VModel V-Editor
- 1024×1024: ~$0.01 ✅

### Cloudinary (free tier)
- 25GB storage
- 25k transformations/month
- Bandwidth: 25GB/month

**Recommendation:** Start with FASHN 2K balanced for the best quality/cost ratio.
