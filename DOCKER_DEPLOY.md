# AUREVYA Docker Deployment

## Quick Start

```bash
# 1. Copy and fill in your API keys
cp .env.example backend/.env
# Edit backend/.env with your actual keys

# 2. Build and start all services
docker-compose up --build

# 3. Visit http://localhost
```

## Architecture

```
                 ┌──────────────────────────────────┐
Browser :80 ───► │  Nginx (aurevya-frontend)        │
                 │  - Serves React SPA static files  │
                 │  - Proxies /api/* → backend:8000  │
                 └──────────────┬───────────────────-┘
                                │ internal network
                 ┌──────────────▼───────────────────-┐
                 │  FastAPI (aurevya-photo-check)    │
                 │  - /api/photo-check               │
                 │  - /api/try-on  (VModel AI)       │
                 │  - /healthz  /readyz              │
                 └───────────────────────────────────┘
```

## Services

| Service | Container | Port |
|---------|-----------|------|
| Frontend (Nginx + React) | `aurevya-frontend` | `80` (public) |
| Backend (FastAPI) | `aurevya-photo-check` | `8000` (internal only) |

## Commands

```bash
# Start (detached)
docker-compose up -d --build

# View logs
docker-compose logs -f

# View backend logs only
docker-compose logs -f photo-check-backend

# Stop
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Check service health
docker-compose ps
```

## Environment Variables

All backend env vars go in `backend/.env`:

```env
VMODEL_API_KEY=your_key
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
GEMINI_API_KEY=optional
```

## Notes

- Backend takes ~60s to start (loads ML models at startup)
- Frontend waits for backend to be healthy before starting (`depends_on: condition: service_healthy`)
- Try-on generation can take up to 3 minutes — Nginx is configured with 200s proxy timeout
- `client_max_body_size 20M` handles base64 portrait + jewellery image uploads
