@echo off
REM Autosuggestion Project Setup and Run Script

echo.
echo ======================================
echo Autosuggestion Project
echo ======================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org
    pause
    exit /b 1
)

echo [1/4] Checking Python installation...
python --version

echo.
echo [2/4] Installing Python dependencies...
cd backend
pip install -r requirements.txt

echo.
echo [3/4] Backend setup complete!
echo [4/4] Starting Flask server...
echo.
echo Backend will start at: http://localhost:5000
echo API endpoint: http://localhost:5000/api/suggestions
echo.
echo Please wait while words are being loaded into the Trie...
echo.

python app.py

pause
