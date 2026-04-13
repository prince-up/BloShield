@echo off
REM BloShield Quick Start Script

echo.
echo =========================================
echo     BloShield Real-Time Testing Setup
echo =========================================
echo.

echo [1/3] Starting Backend (FastAPI)...
start cmd /k "cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield\backend && python -m uvicorn main:app --reload"

timeout /t 3 >nul

echo [2/3] Starting Frontend (Next.js)...
start cmd /k "cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield\frontend && npm run dev"

timeout /t 3 >nul

echo [3/3] Starting Traffic Simulator...
start cmd /k "cd c:\Users\lucky\OneDrive\Pictures\Desktop\BloShield\simulator && python traffic_gen.py"

echo.
echo =========================================
echo.
echo ✅ All services are starting...
echo.
echo Your dashboard will be ready at:
echo   👉 http://localhost:3000
echo.
echo Backend API:
echo   👉 http://localhost:8000
echo   👉 API Docs: http://localhost:8000/docs
echo.
echo Keep these terminals running!
echo Press Ctrl+C in any terminal to stop that service.
echo.
echo =========================================
echo.

pause
