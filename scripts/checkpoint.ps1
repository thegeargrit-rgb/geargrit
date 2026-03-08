param(
  [Parameter(Mandatory = $true)]
  [string]$Message,

  [Parameter(Mandatory = $false)]
  [string]$Tag
)

$ErrorActionPreference = "Stop"

Write-Host "Staging changes..."
git add -A
if ($LASTEXITCODE -ne 0) {
  throw "git add failed"
}

Write-Host "Creating commit..."
git commit -m "chore(checkpoint): $Message"
if ($LASTEXITCODE -ne 0) {
  throw "git commit failed; checkpoint tag not created"
}

if ($Tag) {
  Write-Host "Creating tag $Tag..."
  git tag -a $Tag -m $Message
  if ($LASTEXITCODE -ne 0) {
    throw "git tag failed"
  }
}

Write-Host "Done."
Write-Host "Next: git push origin main --follow-tags"
