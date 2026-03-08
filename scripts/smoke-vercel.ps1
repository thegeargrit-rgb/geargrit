param(
  [Parameter(Mandatory = $true)]
  [string]$BaseUrl,
  [string]$AdminUser,
  [string]$AdminPass
)

$ErrorActionPreference = "Stop"

function Join-Url([string]$base, [string]$path) {
  return ($base.TrimEnd('/') + $path)
}

function Test-Route([string]$name, [string]$path, [int[]]$ExpectedStatus, [hashtable]$Headers) {
  $url = Join-Url $BaseUrl $path
  try {
    $response = Invoke-WebRequest -Uri $url -Method GET -MaximumRedirection 0 -Headers $Headers -UseBasicParsing
    $status = [int]$response.StatusCode
  } catch {
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
      $status = [int]$_.Exception.Response.StatusCode
    } else {
      throw
    }
  }

  $ok = $ExpectedStatus -contains $status
  return [pscustomobject]@{
    Check = $name
    Path = $path
    Status = $status
    Expected = ($ExpectedStatus -join ',')
    Pass = [bool]$ok
  }
}

$headers = @{}
$adminHeaders = @{}
if ($AdminUser -and $AdminPass) {
  $pair = "${AdminUser}:${AdminPass}"
  $basic = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($pair))
  $adminHeaders["Authorization"] = "Basic $basic"
}

$results = @()
$results += Test-Route "Health API" "/api/health" @(200) $headers
$results += Test-Route "Homepage" "/" @(200) $headers
$results += Test-Route "Categories" "/categories" @(200) $headers
$results += Test-Route "Reviews" "/reviews" @(200) $headers
$results += Test-Route "Guides" "/guides" @(200) $headers
$results += Test-Route "Robots" "/robots.txt" @(200) $headers
$results += Test-Route "Sitemap" "/sitemap.xml" @(200) $headers
$results += Test-Route "404 page" "/random-404-test" @(404) $headers
$results += Test-Route "Affiliate redirect" "/go/test-yonex" @(307,302,301) $headers

if ($adminHeaders.Count -gt 0) {
  $results += Test-Route "Admin health (auth)" "/admin/affiliate-health" @(200) $adminHeaders
} else {
  $results += Test-Route "Admin health (unauth expected)" "/admin/affiliate-health" @(401,307,302) $headers
}

$results | Format-Table -AutoSize

$failed = @($results | Where-Object { $_.Pass -ne $true })
if ($failed.Count -gt 0) {
  Write-Host "`nSmoke test result: FAIL ($($failed.Count) checks failed)" -ForegroundColor Red
  exit 1
}

Write-Host "`nSmoke test result: PASS" -ForegroundColor Green