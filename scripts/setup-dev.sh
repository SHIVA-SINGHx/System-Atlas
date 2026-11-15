#!/usr/bin/env bash
set -euo pipefail

echo "⚡ Setting up System Atlas Monorepo..."

# 1. Copy env templates
for svc in services/*/; do
  svc="${svc%/}"
  if [ -f "$svc/.env.example" ] && [ ! -f "$svc/.env" ]; then
    cp "$svc/.env.example" "$svc/.env"
    echo "  -> Created $svc/.env"
  fi
done

if [ -f "apps/web/.env.example" ] && [ ! -f "apps/web/.env" ]; then
  cp "apps/web/.env.example" "apps/web/.env"
  echo "  -> Created apps/web/.env"
fi

if [ -f ".env.example" ] && [ ! -f ".env" ]; then
  cp ".env.example" ".env"
  echo "  -> Created .env"
fi

# 2. Start infra
echo "🐳 Starting PostgreSQL and Redis..."
docker compose up -d postgres redis

echo "✅ Environment configured. Run 'pnpm install && pnpm dev'"
