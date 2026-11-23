# Run all Prisma migrations using atlas superuser
$root = "D:\Coding\System-Atlas"
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
  Write-Host "Migrating $svc..." -ForegroundColor Yellow
  Push-Location $svcDir
  $env:DATABASE_URL = (Get-Content .env | Select-String "DATABASE_URL").Line.Split("=", 2)[1]
  npx prisma migrate deploy --schema=prisma/schema.prisma
  if ($LASTEXITCODE -ne 0) {
    Write-Warning "$svc migration failed - continuing"
  } else {
    Write-Host "  ✅ $svc migrated" -ForegroundColor Green
  }
  Pop-Location
}
Write-Host "`nAll migrations done." -ForegroundColor Cyan
