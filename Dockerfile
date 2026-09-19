# ==========================================
# 1. Builder Stage — Vite static build
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
ENV NODE_ENV=production
RUN npm run build

# ==========================================
# 2. Production Stage — Nginx static server
# ==========================================
FROM nginx:alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (handles SPA routing + backend proxy)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
