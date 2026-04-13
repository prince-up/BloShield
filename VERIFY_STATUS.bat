@echo off
REM BloShield Real-Time Verification Script

echo.
echo =========================================
echo   BloShield Real-Time Status Check
echo =========================================
echo.

REM Check Backend
echo Checking Backend API...
curl -s http://localhost:8000/ >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend is RUNNING (http://localhost:8000)
) else (
    echo ❌ Backend is NOT running
    echo    Start it with: cd backend ^&^& python -m uvicorn main:app --reload
)

echo.

REM Check Frontend
echo Checking Frontend...
curl -s http://localhost:3000/ >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend is RUNNING (http://localhost:3000)
) else (
    echo ❌ Frontend is NOT running
    echo    Start it with: cd frontend ^&^& npm run dev
)

echo.

REM Check API Docs
echo Checking API Documentation...
curl -s http://localhost:8000/docs >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ API Docs available (http://localhost:8000/docs)
) else (
    echo ❌ API Docs not accessible
)

echo.

REM Check Stats Endpoint
echo Checking Stats API...
curl -s http://localhost:8000/stats >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Stats API is working
    echo   Fetching latest stats...
    curl -s http://localhost:8000/stats | findstr /c:"total_requests" >nul
    if %errorlevel% equ 0 (
        echo   ✅ Data is being recorded
    )
) else (
    echo ❌ Stats API not responding
)

echo.
echo =========================================
echo.
echo 🚀 NEXT STEPS:
echo.
echo 1. Open http://localhost:3000 in your browser
echo.
echo 2. Sign Up for a new account
echo    - Click "Don't have an account? Sign up"
echo    - Fill in your details
echo    - Password must be 8+ characters
echo.
echo 3. Login with your credentials
echo    - You'll be redirected to the dashboard
echo.
echo 4. Check Real-Time Features:
echo    ✅ Live Activity Feed (should update every 5-15 seconds)
echo    ✅ Dashboard Stats (should auto-update)
echo    ✅ Risk Meter (should show current risk level)
echo    ✅ AI Insights (smart behavioral analysis)
echo.
echo 5. Monitor in Browser:
echo    - Press F12 to open DevTools
echo    - Go to Network tab
echo    - Filter by "WS" to see WebSocket
echo    - Should show: ws://localhost:8000/ws
echo.
echo =========================================
echo.

pause
