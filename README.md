# AUREVYA Haute Joaillerie — Digital Salon & AI Virtual Mirror

Ultra-luxury contemporary haute joaillerie digital flagship with the signature AI Virtual Mirror.

## Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS, Vite (`http://localhost:5173`)
- **Backend API:** FastAPI Python service in `backend/velura-photo-check/` (`http://localhost:8000`)
  - **`/api/photo-check`**: Pre-fitting patron portrait calibration (head pose, neckline/face framing, lighting, resolution).
  - **`/api/try-on`**: Haute Joaillerie AI Virtual Fitting with Gemini Vision prompt calibrated for luxury jewels (necklaces, earrings, rings, bracelets, maang tikka).

---

## How to Run

### 1. Run the Frontend (React + Vite)
In the project root directory:
```bash
npm run dev
```
Opens the web app at: **`http://localhost:5173`**

---

### 2. Run the Backend API (FastAPI) *(Optional)*
In a second terminal window:
```bash
cd backend/velura-photo-check
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```
*Note: The React frontend automatically proxies `/api` and `/photo-check` to `http://localhost:8000` with graceful local fallback if the backend is not running.*
