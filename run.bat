@echo off
title Washify Ops - Laundry Frontend
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 goto noNode
if not exist node_modules (
  echo Installing dependencies - first run only...
  call npm install
)
echo Starting Vite at http://localhost:5173/  - press Ctrl+C to stop
call npm run dev
goto end
:noNode
echo Node.js was not found, so serving the prebuilt copy in dist\ instead.
echo Install Node.js 18 or newer from https://nodejs.org to use the Vite dev server.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
:end
pause
