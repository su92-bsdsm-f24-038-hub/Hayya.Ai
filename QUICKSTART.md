# 🚀 Quick Start Guide - Hayya.AI

## Running the Application in 3 Simple Steps

### Step 1: Install Dependencies
```powershell
pip install -r req.txt
```

### Step 2: Start the Server
```powershell
python app.py
```

You should see output like:
```
AI Model loaded successfully.
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 3: Open Your Browser

**Period Predictor:**
```
http://localhost:8000/index
```

**Chat with Hayya:**
```
http://localhost:8000/chat-page
```

## Test the Period Predictor

Try these sample dates:
```
2025-07-01
2025-07-29
2025-08-27
2025-09-25
2025-10-23
```

Expected result:
- Next predicted date: ~November 20, 2025
- Mean cycle: ~28 days
- Confidence interval provided
- Fertile window calculated

## Common Commands

**Stop the server:** Press `Ctrl + C` in the terminal

**Restart the server:** Press `Ctrl + C`, then run `python app.py` again

**Check if running:** Visit `http://localhost:8000/` (should return `{"status": "ok"}`)

## Need Help?

See the full README.md for detailed documentation!
