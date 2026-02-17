@echo off
echo Starting GPA Calculator for Local Network Sharing...
echo.
echo Once started, look for the "Network" URL in the output (e.g., http://192.168.1.X:3000)
echo You can open that link on your phone or other computer connected to the SAME WiFi.
echo.
SET PATH=%PATH%;C:\Program Files\nodejs
npm run dev -- -H 0.0.0.0
pause
