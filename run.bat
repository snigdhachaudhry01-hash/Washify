@echo off
title Foldline Campus Laundry System
echo Starting Foldline Laundry Management System...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
