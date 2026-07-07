# syntax=docker/dockerfile:1

# The build stage runs on the build host's native arch even for multi-arch
# output (the exported HTML is arch-independent), so arm64 images don't pay
# the qemu emulation tax.
FROM --platform=$BUILDPLATFORM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Build-time site configuration; empty args fall through to the production
# defaults in next.config.ts (https://api.fightpaperwork.com).
ARG API_HOST
ARG SUPPORT_EMAIL
ENV API_HOST=${API_HOST} SUPPORT_EMAIL=${SUPPORT_EMAIL} NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/security-headers.conf
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
