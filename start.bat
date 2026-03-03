@echo off
echo =========================================================
echo AdPlay Startup Script (Windows)
echo =========================================================
echo.
echo Please wait while we start the Backend and Frontend...
echo.

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in your PATH. 
    echo Please install Node.js from https://nodejs.org/
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

:: Start Backend in a new command window
echo Startting Backend...
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
)
start "AdPlay Backend" cmd /c "npm run dev"
cd ..

:: Start Frontend in a new command window
echo Startting Frontend...
cd frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)
start "AdPlay Frontend" cmd /c "npm run start"
cd ..

echo.
echo AdPlay is starting up! 
echo Two new windows have opened for the backend and frontend.
echo.
echo You can access the application shortly at:
echo Backend (API):   http://localhost:3000
echo Frontend (App):  http://localhost:4200
echo.
echo Press any key to close this window (the app will keep running in the other windows).
pause >nul
