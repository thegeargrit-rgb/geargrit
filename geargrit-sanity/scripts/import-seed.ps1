param(
  [Parameter(Mandatory = $false)]
  [string]$Dataset = "production"
)

$ErrorActionPreference = "Stop"

Write-Host "Importing M2 sample seed into dataset '$Dataset'..."

npx sanity dataset import ./seed/m2-sample.ndjson $Dataset --missing

if ($LASTEXITCODE -ne 0) {
  throw "Seed import failed"
}

Write-Host "Seed import completed."
