param(
  [Parameter(Mandatory = $true)]
  [string]$BaseUrl,
  [string[]]$Strategies = @("mobile", "desktop"),
  [string]$OutputDir = "reports/psi",
  [string]$ApiKey = $env:PSI_API_KEY,
  [int]$MaxRetries = 4
)

$ErrorActionPreference = "Stop"

function Join-Url([string]$base, [string]$path) {
  $trimmed = $base.TrimEnd('/')
  if ($path.StartsWith('/')) {
    return "$trimmed$path"
  }
  return "$trimmed/$path"
}

function Get-FirstBlogPostPath([string]$base) {
  $sitemapUrl = Join-Url $base "/sitemap.xml"
  $sitemap = Invoke-WebRequest -Uri $sitemapUrl -UseBasicParsing -TimeoutSec 30
  $regex = [regex]"<loc>(https?://[^<]+/blog/[^<]+)</loc>"
  $match = $regex.Match($sitemap.Content)
  if (-not $match.Success) {
    return $null
  }

  $fullUrl = $match.Groups[1].Value
  $uri = [Uri]$fullUrl
  return $uri.PathAndQuery
}

function Invoke-Psi([string]$url, [string]$strategy, [string]$apiKey, [int]$maxRetries) {
  $endpoint = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
  $query = "?url=$([Uri]::EscapeDataString($url))&strategy=$strategy"
  $query += "&category=performance&category=accessibility&category=best-practices&category=seo"
  if ($apiKey) {
    $query += "&key=$([Uri]::EscapeDataString($apiKey))"
  }

  $requestUrl = "$endpoint$query"
  for ($attempt = 1; $attempt -le ($maxRetries + 1); $attempt++) {
    try {
      return Invoke-RestMethod -Uri $requestUrl -Method GET -TimeoutSec 120
    } catch {
      $response = $_.Exception.Response
      $statusCode = if ($response) { [int]$response.StatusCode } else { 0 }
      $isRetryable = $statusCode -eq 429 -or $statusCode -ge 500
      if (-not $isRetryable -or $attempt -gt $maxRetries) {
        if ($statusCode -eq 429 -and -not $apiKey) {
          throw "PSI rate-limited request (429). Set PSI_API_KEY and rerun for stable quotas."
        }
        throw
      }

      $retryAfter = 0
      if ($response -and $response.Headers["Retry-After"]) {
        [void][int]::TryParse($response.Headers["Retry-After"], [ref]$retryAfter)
      }
      if ($retryAfter -le 0) {
        $retryAfter = [Math]::Min(60, [Math]::Pow(2, $attempt + 1))
      }

      Write-Warning "PSI returned HTTP $statusCode for $strategy ($url). Retrying in $retryAfter sec (attempt $attempt/$maxRetries)..."
      Start-Sleep -Seconds $retryAfter
    }
  }
}

function Parse-PsiResult($result, [string]$routePath, [string]$strategy) {
  $categories = $result.lighthouseResult.categories
  $audits = $result.lighthouseResult.audits

  return [pscustomobject]@{
    Route = $routePath
    Strategy = $strategy
    Performance = [math]::Round([double]$categories.performance.score * 100)
    Accessibility = [math]::Round([double]$categories.accessibility.score * 100)
    BestPractices = [math]::Round([double]$categories.'best-practices'.score * 100)
    SEO = [math]::Round([double]$categories.seo.score * 100)
    FCP = $audits.'first-contentful-paint'.displayValue
    LCP = $audits.'largest-contentful-paint'.displayValue
    TBT = $audits.'total-blocking-time'.displayValue
    CLS = $audits.'cumulative-layout-shift'.displayValue
  }
}

$resolvedBase = $BaseUrl.TrimEnd('/')
$normalizedStrategies = @()
foreach ($raw in $Strategies) {
  $normalizedStrategies += ($raw -split ',')
}
$normalizedStrategies = @(
  $normalizedStrategies |
    ForEach-Object { $_.Trim().ToLowerInvariant() } |
    Where-Object { $_ -in @("mobile", "desktop") } |
    Select-Object -Unique
)
if ($normalizedStrategies.Count -eq 0) {
  throw "No valid strategy provided. Use 'mobile' and/or 'desktop'."
}

$firstBlogPost = Get-FirstBlogPostPath $resolvedBase
$routes = @("/", "/blog")
if ($firstBlogPost) {
  $routes += $firstBlogPost
}

New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null

$results = @()
foreach ($strategy in $normalizedStrategies) {
  foreach ($route in $routes) {
    $url = Join-Url $resolvedBase $route
    Write-Host "Running PSI ($strategy): $url"
    $raw = Invoke-Psi -url $url -strategy $strategy -apiKey $ApiKey -maxRetries $MaxRetries

    $safeRoute = ($route -replace '[^a-zA-Z0-9]+', '_').Trim('_')
    if (-not $safeRoute) {
      $safeRoute = 'home'
    }

    $rawPath = Join-Path $OutputDir "psi_${strategy}_${safeRoute}.json"
    $raw | ConvertTo-Json -Depth 30 | Set-Content -Encoding utf8 $rawPath

    $results += Parse-PsiResult -result $raw -routePath $route -strategy $strategy
  }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$summaryPath = Join-Path $OutputDir "summary_$timestamp.json"
$results | ConvertTo-Json -Depth 6 | Set-Content -Encoding utf8 $summaryPath

Write-Host "`nPSI Summary"
$results | Sort-Object Strategy, Route | Format-Table -AutoSize
Write-Host "`nSaved summary: $summaryPath"
