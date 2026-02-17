@echo off
set GIT_PATH="C:\Program Files\Git\cmd\git.exe"
echo.
echo ==========================================
echo      Updating Your Vercel App
echo ==========================================
echo.
echo 1. Saving your changes...
%GIT_PATH% add .
echo.
echo 2. Committing changes...
set /p MSG="Enter a message for this update (e.g. 'fixed color'): "
%GIT_PATH% commit -m "%MSG%"
echo.
echo 3. Pushing to GitHub (this triggers Vercel)...
%GIT_PATH% push origin main
echo.
echo ==========================================
echo Done! Vercel will now redeploy your app automatically.
echo It usually takes about 1-2 minutes to see the changes online.
echo ==========================================
pause
