# 🎯 Hayya.AI - Complete Feature List

## 📱 What You Can Do

### 1. 🔮 Period Predictor (Main Feature)
Navigate to: `http://localhost:8000/index`

**Input:**
- Enter your past period start dates
- Format: YYYY-MM-DD (one per line or comma-separated)
- Example:
  ```
  2025-07-01
  2025-07-29
  2025-08-27
  ```

**Output:**
- 📅 **Predicted Next Period Date** - Your estimated next cycle start
- 📊 **Mean Cycle Length** - Average days between periods
- 📈 **Standard Deviation** - Cycle variability measure
- 🎯 **Confidence Interval** - Date range prediction (±1 std dev)
- 💚 **Fertile Window** - Estimated fertility period
- ⚠️ **Irregularity Note** - Warning if cycles vary significantly

### 2. 💬 AI Health Chatbot
Navigate to: `http://localhost:8000/chat-page`

**Features:**
- Ask health and wellness questions
- Get empathetic, knowledgeable responses
- Powered by Google Gemini AI
- Always includes medical disclaimer
- Safe space for sensitive topics

## 🎨 Design Highlights

### Color Scheme
- 💜 Lavender gradient backgrounds
- 🌸 Soft pink accents
- ☁️ Sky blue tones
- ⚪ White content areas
- 🎨 Soft shadows and rounded corners

### Animations
- ✨ Fade-in effects on page load
- 🔄 Smooth loading spinner
- 📊 Slide-in results display
- 🎯 Hover effects on buttons
- 💫 Typing indicator for chatbot

## 📂 Project Files

```
hayya.AI/
├── 🐍 app.py                 # FastAPI backend server
├── 🌸 index.html            # Period Predictor (main page)
├── 💬 chat.html             # Chatbot interface
├── 📝 req.txt               # Python dependencies
├── 📚 README.md             # Full documentation
├── 🚀 QUICKSTART.md         # Quick start guide
├── 📊 PROJECT_SUMMARY.md    # Completion summary
├── 🎯 FEATURES.md           # This file
├── 🧪 test_api.py           # API test suite
├── ⚡ start-server.ps1      # Server launcher script
└── 📁 static/
    ├── 🎨 style.css         # Chatbot styles
    ├── 💬 chat.js           # Chatbot functionality
    └── 📜 script.js         # Legacy script
```

## 🚀 Quick Commands

### Start Server
```powershell
python app.py
```
or
```powershell
.\start-server.ps1
```

### Run Tests
```powershell
python test_api.py
```

### Install Dependencies
```powershell
pip install -r req.txt
```

## 🔗 URLs

| Feature | URL |
|---------|-----|
| Period Predictor | http://localhost:8000/index |
| Chatbot | http://localhost:8000/chat-page |
| Health Check | http://localhost:8000/ |
| API Docs (auto) | http://localhost:8000/docs |

## 📊 Prediction Algorithm

### How It Works

1. **Input Processing**
   - Parse dates in YYYY-MM-DD format
   - Sort chronologically
   - Validate format

2. **Cycle Calculation**
   - Calculate days between consecutive dates
   - Apply lookback window (default: 6 cycles)
   - Handle single date case (use 28-day default)

3. **Statistical Analysis**
   - Compute mean cycle length
   - Calculate standard deviation
   - Detect irregularity (std dev > 6 days)

4. **Prediction**
   - Next date = Last date + Mean cycle length
   - Confidence interval = ±1 standard deviation
   - Fertile window = (Next date - 14 days) ±4 days

### Example Calculation

**Input Dates:**
```
2025-07-01
2025-07-29  (28 days later)
2025-08-27  (29 days later)
2025-09-25  (29 days later)
2025-10-23  (28 days later)
```

**Calculations:**
- Cycle lengths: [28, 29, 29, 28] days
- Mean: 28.5 days
- Std Dev: 0.58 days
- Last date: 2025-10-23
- Predicted: 2025-10-23 + 28.5 ≈ 2025-11-20

**Results:**
- Predicted Date: November 20, 2025
- Confidence: November 19-21, 2025
- Fertile Window: November 5-13, 2025

## ⚠️ Important Notes

### Medical Disclaimer
- This is an **estimation tool only**
- NOT for contraception
- NOT a medical diagnosis
- Always consult healthcare professionals

### Data Privacy
- No data stored permanently
- All calculations happen in real-time
- No user tracking
- API key required for chatbot only

## 🎓 Educational Value

### Learn About
- Menstrual cycle tracking
- Statistical prediction methods
- Cycle length variability
- Fertile window estimation
- Health data interpretation

### Technology Skills
- Async/await patterns
- RESTful API design
- FastAPI framework
- Frontend-backend communication
- Error handling

## 🌟 Pro Tips

### For Best Predictions
1. Enter at least 3-6 past cycle dates
2. Use accurate start dates
3. Track consistently over time
4. Consider lifestyle factors
5. Consult doctor if cycles are very irregular

### Troubleshooting
- **Can't connect?** → Check if server is running
- **Wrong dates?** → Verify YYYY-MM-DD format
- **Weird results?** → Need more data points
- **Chatbot not working?** → Check API key in app.py

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Server starts without errors
- ✅ Page loads with beautiful design
- ✅ Input validation provides helpful hints
- ✅ Loading spinner appears during processing
- ✅ Results display with all metrics
- ✅ Chatbot responds to messages

## 📞 Support Resources

### Documentation
- README.md - Complete guide
- QUICKSTART.md - Fast setup
- PROJECT_SUMMARY.md - Technical details
- This file - Feature overview

### Testing
- test_api.py - Automated API tests
- Browser console - Frontend debugging
- Server logs - Backend debugging

---

**Hayya.AI** - Your caring companion for period tracking and health wellness 🌸

*Made with 💜 for women's health*
