# Hayya.AI - Server Management Script
# Run this script to start the Period Predictor backend server

Write-Host "🌸 Starting Hayya.AI Period Predictor Server..." -ForegroundColor Magenta
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found. Please install Python 3.8 or higher." -ForegroundColor Red
    exit 1
}

# Check if dependencies are installed
Write-Host ""
Write-Host "Checking dependencies..." -ForegroundColor Yellow

if (Test-Path "req.txt") {
    Write-Host "✓ Requirements file found" -ForegroundColor Green
    
    # Install dependencies
    Write-Host ""
    Write-Host "Installing/Updating dependencies..." -ForegroundColor Yellow
    pip install -r req.txt --quiet
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ req.txt not found" -ForegroundColor Red
    exit 1
}

# Start the server
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "🚀 Starting FastAPI Server..." -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Server will be available at:" -ForegroundColor White
Write-Host "   • Period Predictor: http://localhost:8000/index" -ForegroundColor Yellow
Write-Host "   • Chatbot: http://localhost:8000/chat-page" -ForegroundColor Yellow
Write-Host "   • Health Check: http://localhost:8000/" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""

# Run the server
python app.py
