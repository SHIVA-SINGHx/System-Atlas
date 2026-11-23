# System Atlas - Start All Services
# Run this from D:\Coding\System-Atlas

Write-Host "🚀 Starting System Atlas (Host Mode)..." -ForegroundColor Cyan

$root = $PSScriptRoot
if (-not $root) { $root = "D:\Coding\System-Atlas" }

$logsDir = Join-Path $root "logs"
New-Item -ItemType Directory -Force -Path $logsDir | Out-Null

# 1. Services to start
$services = @(
  @{ name = "api-gateway";          dir = "services\api-gateway" },
  @{ name = "auth-service";         dir = "services\auth-service" },
  @{ name = "learning-service";     dir = "services\learning-service" },
  @{ name = "progress-service";     dir = "services\progress-service" },
  @{ name = "resource-service";     dir = "services\resource-service" },
  @{ name = "playground-service";   dir = "services\playground-service" },
  @{ name = "interview-service";    dir = "services\interview-service" },
  @{ name = "organization-service"; dir = "services\organization-service" },
  @{ name = "notification-service"; dir = "services\notification-service" }
)

foreach ($svc in $services) {
  $svcDir = Join-Path $root $svc.dir
  $logFile = Join-Path $logsDir "$($svc.name).log"

  Write-Host "  Starting $($svc.name)..." -ForegroundColor Yellow
  Start-Process cmd.exe -ArgumentList @(
    "/c", "cd /d `"$svcDir`" && pnpm run dev > `"$logFile`" 2>&1"
  ) -WindowStyle Minimized
  Start-Sleep -Milliseconds 400
}

Write-Host ""
Write-Host "  Starting web app (Next.js)..." -ForegroundColor Yellow
$webDir  = Join-Path $root "apps\web"
$webLog  = Join-Path $logsDir "web.log"
Start-Process cmd.exe -ArgumentList @(
  "/c", "cd /d `"$webDir`" && pnpm run dev > `"$webLog`" 2>&1"
) -WindowStyle Minimized

Write-Host ""
Write-Host "✅ All 10 services launched in background!" -ForegroundColor Green
Write-Host ""
Write-Host "Live Endpoints in Your Browser:" -ForegroundColor Cyan
Write-Host "  🌐 Web App:       http://localhost:3000"
Write-Host "  ⚡ API Gateway:   http://localhost:3001/health"
Write-Host "  📚 Learning API:  http://localhost:3003/dsa/topics"
Write-Host "  🧪 Progress API:  http://localhost:3004/health"
Write-Host "  📖 Resource API:  http://localhost:3007/resources"
Write-Host ""
Write-Host "Logs directory: $logsDir" -ForegroundColor DarkGray
Write-Host ""
Write-Host "Wait ~15-20 seconds for TypeScript compilation, then open http://localhost:3000" -ForegroundColor Cyan
