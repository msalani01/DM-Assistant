@echo off
REM D&D 5.5e DM Assistant - Setup and Run Script

echo.
echo ======================================
echo D^&D 5.5e (2024) DM Assistant
echo ======================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.7+ from https://www.python.org
    pause
    exit /b 1
)

echo [OK] Python is installed
echo.

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo [*] Creating virtual environment...
    python -m venv venv
    echo [OK] Virtual environment created
) else (
    echo [OK] Virtual environment already exists
)

echo.
echo [*] Activating virtual environment...
call venv\Scripts\activate.bat

echo [OK] Virtual environment activated
echo.

REM Install dependencies
echo [*] Installing dependencies from requirements.txt...
pip install -q -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [OK] Dependencies installed
echo.

REM Run the app
echo ======================================
echo [OK] Starting D^&D DM Assistant...
echo ======================================
echo.
echo Open your browser and go to:
echo   http://127.0.0.1:5000
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py
