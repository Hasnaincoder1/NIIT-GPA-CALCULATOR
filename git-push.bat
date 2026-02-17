@echo off
set GIT_PATH="C:\Program Files\Git\cmd\git.exe"
echo.
echo ==========================================
echo      Pushing Code to GitHub
echo ==========================================
echo.
echo Please paste your GitHub Repository URL below
echo (Example: https://github.com/YOUR_USERNAME/gpa-calculator.git)
echo.
set /p REPO_URL="Repository URL: "

%GIT_PATH% branch -M main
%GIT_PATH% remote remove origin 2>nul
%GIT_PATH% remote add origin %REPO_URL%
%GIT_PATH% push -u origin main

echo.
echo Done! Go back to Vercel and try importing again.
pause
