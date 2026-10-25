# PowerShell Local Static Server for Foldline Frontend
param(
    [int]$Port = 3000
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $scriptDir) { $scriptDir = (Get-Location).Path }

$url = "http://localhost:$Port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
    $listener.Start()
} catch {
    Write-Warning "Port $Port is in use or requires elevation. Falling back to port 8080..."
    $Port = 8080
    $url = "http://localhost:$Port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($url)
    $listener.Start()
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Foldline Campus Laundry Management System Frontend" -ForegroundColor White
Write-Host " Running at: $url" -ForegroundColor Green
Write-Host " Root Dir:   $scriptDir" -ForegroundColor Gray
Write-Host " Press Ctrl+C in this terminal to stop the server." -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $relPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($relPath)) {
            $relPath = "index.html"
        }

        $filePath = Join-Path $scriptDir $relPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".svg"  { "image/svg+xml" }
                ".ico"  { "image/x-icon" }
                default { "application/octet-stream" }
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.AddHeader("Access-Control-Allow-Origin", "*")

            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } else {
            $response.StatusCode = 404
            $err = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $relPath")
            $response.ContentLength64 = $err.Length
            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($err, 0, $err.Length)
            }
        }
        $response.Close()
    } catch {
        Write-Host "Request error: $_" -ForegroundColor DarkGray
        if ($null -ne $response) {
            try { $response.Close() } catch {}
        }
    }
}
