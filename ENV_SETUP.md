# Environment Variables Setup Guide

## 📋 Overview

Hayya.AI now uses environment variables for secure configuration management. This keeps sensitive data (like API keys) out of your source code.

---

## 🔧 Local Development Setup

### Step 1: Install python-dotenv
```bash
pip install python-dotenv
```

### Step 2: Create .env file
Copy `.env.example` to `.env`:
```bash
# Windows PowerShell
Copy-Item .env.example .env

# Linux/Mac
cp .env.example .env
```

### Step 3: Configure your .env
Edit `.env` and add your values:
```env
GEMINI_API_KEY=your_actual_api_key_here
HOST=0.0.0.0
PORT=8080
ENVIRONMENT=development
```

### Step 4: Run the server
```bash
uvicorn app:app --reload --host 127.0.0.1 --port 8080
```

---

## 🚀 Render Deployment Setup

### Option 1: Environment Tab (Recommended)
1. Go to your Render dashboard
2. Select your web service
3. Click **"Environment"** tab
4. Add environment variables:

```
GEMINI_API_KEY = AIzaSyCENWeW9so8zX0fCTPChY2a3z-0fJ3oet0
ENVIRONMENT = production
```

5. Click **"Save Changes"**
6. Service auto-redeploys

### Option 2: render.yaml (Already Configured)
Environment variables can also be defined in `render.yaml`:

```yaml
envVars:
  - key: GEMINI_API_KEY
    value: your_key_here
  - key: ENVIRONMENT
    value: production
```

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep `.env` in `.gitignore` (already configured)
- Use `.env.example` as a template (committed to git)
- Store real API keys in Render's environment variables
- Use different API keys for development and production

### ❌ DON'T:
- Commit `.env` file to git
- Hardcode API keys in source code
- Share API keys in public repositories
- Use production keys in development

---

## 📝 Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes | None |
| `HOST` | Server host address | No | `0.0.0.0` |
| `PORT` | Server port (Render sets this) | No | `8080` |
| `ENVIRONMENT` | Runtime environment | No | `development` |

---

## 🐛 Troubleshooting

### "GEMINI_API_KEY not found in environment variables"
**Solution:** Check if `.env` file exists and contains `GEMINI_API_KEY=your_key`

### AI Model fails to load
**Solution:** 
1. Verify your API key is valid
2. Check Gemini API quota/billing
3. Ensure `python-dotenv` is installed

### Changes not taking effect
**Solution:** Restart your server after modifying `.env`

---

## 📂 File Structure

```
hayya.AI/
├── .env                 # Your local config (NOT in git)
├── .env.example         # Template (committed to git)
├── .gitignore           # Excludes .env from git
├── app.py               # Loads environment variables
├── requirements.txt     # Includes python-dotenv
└── render.yaml          # Production config
```

---

## 🔄 Migration from Hardcoded Keys

Your `app.py` has been updated from:
```python
# OLD (Hardcoded)
genai.configure(api_key="AIzaSyCENWeW9so8zX0fCTPChY2a3z-0fJ3oet0")
```

To:
```python
# NEW (Environment Variable)
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)
```

This is more secure and follows industry best practices! ✅
