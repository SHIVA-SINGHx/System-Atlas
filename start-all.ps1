# System Atlas - Start All Services
# Run this from D:\Coding\System-Atlas

Write-Host "🚀 Starting System Atlas..." -ForegroundColor Cyan

$root = $PSScriptRoot
if (-not $root) { $root = "D:\Coding\System-Atlas" }

# Services to start (name -> dir)
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
  $logFile = Join-Path $root "logs\$($svc.name).log"
  New-Item -ItemType Directory -Force -Path (Join-Path $root "logs") | Out-Null

  Write-Host "  Starting $($svc.name) -> $logFile" -ForegroundColor Yellow
  Start-Process powershell -ArgumentList @(
    "-NoProfile", "-Command",
    "Set-Location '$svcDir'; pnpm run dev *>&1 | Tee-Object -FilePath '$logFile'"
  ) -WindowStyle Minimized
  Start-Sleep -Milliseconds 300
}

Write-Host ""
Write-Host "  Starting web app -> logs\web.log" -ForegroundColor Yellow
$webDir  = Join-Path $root "apps\web"
$webLog  = Join-Path $root "logs\web.log"
Start-Process powershell -ArgumentList @(
  "-NoProfile", "-Command",
  "Set-Location '$webDir'; pnpm run dev *>&1 | Tee-Object -FilePath '$webLog'"
) -WindowStyle Minimized

Write-Host ""
Write-Host "✅ All services launched in background windows." -ForegroundColor Green
Write-Host ""
Write-Host "Ports:" -ForegroundColor Cyan
Write-Host "  Web App       http://localhost:3000"
Write-Host "  API Gateway   http://localhost:3001"
Write-Host "  Auth          http://localhost:3002"
Write-Host "  Learning      http://localhost:3003"
Write-Host "  Progress      http://localhost:3004"
Write-Host "  Playground    http://localhost:3005"
Write-Host "  Interview     http://localhost:3006"
Write-Host "  Resource      http://localhost:3007"
Write-Host "  Organization  http://localhost:3008"
Write-Host "  Notification  http://localhost:3009"
Write-Host ""
Write-Host "Logs: $root\logs\" -ForegroundColor DarkGray
Write-Host ""
Write-Host "Wait ~30s then visit http://localhost:3000" -ForegroundColor Cyan
