# Hayya.AI Deployment Guide for Render

## 🚀 Quick Deploy to Render

### Step 1: Push to GitHub
```bash
git add .
git commit -m "feat: add Render deployment configuration"
git push origin main
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account
4. Select repository: **`su92-bsdsm-f24-038-hub/Hayya.Ai`**
5. Render will auto-detect `render.yaml` configuration
6. Click **"Create Web Service"**

### Step 3: Set Environment Variable (Important!)
After deployment starts, add your API key:
1. Go to **Environment** tab in Render dashboard
2. Add new environment variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyCENWeW9so8zX0fCTPChY2a3z-0fJ3oet0`
3. Click **"Save Changes"**
4. Service will auto-redeploy

### Your Live URLs
After deployment (5-10 minutes):
- **App:** `https://hayya-ai.onrender.com`
- **Dark Luna:** `https://hayya-ai.onrender.com/dark-luna`
- **Chatbot:** `https://hayya-ai.onrender.com/chat-page`
- **Privacy Policy:** `https://hayya-ai.onrender.com/privacy-policy`

---

## 📋 Configuration Files

### `requirements.txt`
Python dependencies for production deployment.

### `render.yaml`
Render service configuration:
- **Runtime:** Python 3.10.9
- **Region:** Oregon (US West)
- **Plan:** Free tier
- **Build:** `pip install -r requirements.txt`
- **Start:** `uvicorn app:app --host 0.0.0.0 --port $PORT`

### `start.sh`
Alternative startup script with 2 workers for better performance.

---

## 🔒 Security Note
⚠️ **Important:** Your Gemini API key is currently hardcoded in `app.py`.

**For production, you should:**
1. Remove the API key from `app.py`
2. Add it as an environment variable in Render
3. Update `app.py` to read from environment:

```python
import os
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
```

---

## 💰 Pricing
- **Free Tier:** 750 hours/month
- Auto-sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds

---

## 🛠️ Local Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
uvicorn app:app --reload --host 127.0.0.1 --port 8080
```

Access at: http://localhost:8080

---

## 📝 Notes
- Render uses free tier with automatic sleep
- For Chrome extension, use the live Render URL for privacy policy
- Free tier apps sleep after inactivity (first request wakes it)
