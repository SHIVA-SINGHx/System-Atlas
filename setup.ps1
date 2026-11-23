# ============================================================
# System Atlas — Full Local Setup Script
# Run once after cloning: .\setup.ps1
# ============================================================

param(
  [switch]$SkipDocker,
  [switch]$SkipMigrations
)

$root = $PSScriptRoot
if (-not $root) { $root = "D:\Coding\System-Atlas" }
Set-Location $root

Write-Host ""
Write-Host "╔══════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        System Atlas — Local Setup         ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# 1. Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
pnpm install
Write-Host "✅ Dependencies installed" -ForegroundColor Green

# 2. Build shared packages
Write-Host ""
Write-Host "🔨 Building shared packages..." -ForegroundColor Yellow
pnpm --filter @system-atlas/logger build
pnpm --filter @system-atlas/contracts build
Write-Host "✅ Packages built" -ForegroundColor Green

# 3. Start Docker infrastructure
if (-not $SkipDocker) {
  Write-Host ""
  Write-Host "🐳 Starting Docker infrastructure (Postgres + Redis)..." -ForegroundColor Yellow
  docker compose up -d postgres redis
  Write-Host "   Waiting 5s for containers to be ready..."
  Start-Sleep -Seconds 5
  Write-Host "✅ Docker infrastructure up" -ForegroundColor Green
}

# 4. Run Prisma generate + migrations for all services
if (-not $SkipMigrations) {
  Write-Host ""
  Write-Host "🗄️  Running Prisma generate + migrations..." -ForegroundColor Yellow

  $services = @(
    "learning-service",
    "progress-service",
    "resource-service",
    "auth-service",
    "interview-service",
    "playground-service",
    "organization-service",
    "notification-service"
  )

  foreach ($svc in $services) {
    $svcDir = Join-Path $root "services\$svc"
    Write-Host "   → $svc" -ForegroundColor DarkGray
    Push-Location $svcDir
    npx prisma generate --schema=prisma/schema.prisma 2>&1 | Out-Null
    npx prisma migrate deploy --schema=prisma/schema.prisma 2>&1 | Out-Null
    Pop-Location
  }
  Write-Host "✅ All migrations applied" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Setup complete! Now run: .\start-all.ps1" -ForegroundColor Green
Write-Host ""
