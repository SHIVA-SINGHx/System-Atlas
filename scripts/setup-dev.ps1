# System Atlas - Local Developer Environment Setup (PowerShell)
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "[*] Setting up System Atlas Monorepo..." -ForegroundColor Cyan

# 1. Check prerequisites
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js 20+ is required."
}
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Error "pnpm 9+ is required. Install via 'npm install -g pnpm'."
}
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker is required."
}

# 2. Copy .env.example files
Write-Host "[*] Provisioning .env files..." -ForegroundColor Gray
Get-ChildItem -Path "services" -Directory | ForEach-Object {
    $envExample = Join-Path $_.FullName ".env.example"
    $envTarget = Join-Path $_.FullName ".env"
    if ((Test-Path $envExample) -and -not (Test-Path $envTarget)) {
        Copy-Item $envExample $envTarget
        Write-Host "  -> Created $($_.Name)/.env" -ForegroundColor DarkGray
    }
}

if ((Test-Path "apps/web/.env.example") -and -not (Test-Path "apps/web/.env")) {
    Copy-Item "apps/web/.env.example" "apps/web/.env"
    Write-Host "  -> Created apps/web/.env" -ForegroundColor DarkGray
}

if ((Test-Path ".env.example") -and -not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "  -> Created root .env" -ForegroundColor DarkGray
}

# 3. Start Core Infrastructure Containers
Write-Host "[*] Starting PostgreSQL and Redis containers..." -ForegroundColor Cyan
docker compose up -d postgres redis

Write-Host "[*] Waiting for PostgreSQL readiness..." -ForegroundColor Gray
Start-Sleep -Seconds 3

Write-Host "[OK] System Atlas environment prepared!" -ForegroundColor Green
Write-Host "Run 'pnpm install' then 'pnpm dev' to start development." -ForegroundColor Cyan
