#!/bin/bash
# D&D 5.5e DM Assistant - Setup and Run Script (macOS/Linux)

echo ""
echo "======================================"
echo "D&D 5.5e (2024) DM Assistant"
echo "======================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python3 is not installed"
    echo "Please install Python 3.7+ from https://www.python.org"
    exit 1
fi

echo "[✓] Python is installed"
echo ""

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "[*] Creating virtual environment..."
    python3 -m venv venv
    echo "[✓] Virtual environment created"
else
    echo "[✓] Virtual environment already exists"
fi

echo ""
echo "[*] Activating virtual environment..."
source venv/bin/activate

echo "[✓] Virtual environment activated"
echo ""

# Install dependencies
echo "[*] Installing dependencies from requirements.txt..."
pip install -q -r requirements.txt
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo "[✓] Dependencies installed"
echo ""

# Run the app
echo "======================================"
echo "[✓] Starting D&D DM Assistant..."
echo "======================================"
echo ""
echo "Open your browser and go to:"
echo "  http://127.0.0.1:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 app.py
