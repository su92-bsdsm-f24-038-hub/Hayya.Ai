# 🌸 Hayya.AI - Period Predictor & Health Companion

![Version](https://img.shields.io/badge/version-1.0.0-pink)
![Python](https://img.shields.io/badge/python-3.8%2B-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green)
![License](https://img.shields.io/badge/license-MIT-purple)

A beautiful, professional period predictor web application with AI-powered health chatbot. Built with FastAPI (async backend) and pure HTML/CSS/JS (no frameworks) for a seamless user experience.

## ✨ Features

### 🔮 Period Predictor (3 Beautiful UIs!)
- **Statistical Prediction Engine** - Predict next menstrual cycle using historical data
- **Cycle Analytics** - Mean cycle length, standard deviation, confidence intervals
- **Fertile Window Calculation** - Estimate fertility periods for family planning
- **Irregularity Detection** - Automatic detection of irregular cycles
- **3 Stunning UI Themes**:
  - 💜 **Original** - Modern purple gradient theme
  - 🌸 **Luna Cycle** - Soft pastel pink/lavender with glassmorphism
  - 🌙 **Dark Luna** - Elegant black/purple gradient with pink accents

### 💬 AI Health Chatbot
- **Powered by Google Gemini AI** - Intelligent, empathetic responses
- **Women's Health Focus** - Specialized in wellness guidance
- **Safe & Discreet** - Privacy-focused design
- **Medical Disclaimers** - Always reminds users to consult professionals

## 🚀 Demo

### Period Predictor
![Period Predictor Demo](https://via.placeholder.com/800x400/f65a83/ffffff?text=Hayya.AI+Period+Predictor)

### AI Chatbot
![Chatbot Demo](https://via.placeholder.com/800x400/7c3aed/ffffff?text=Hayya.AI+Health+Companion)

## 🛠️ Tech Stack

**Backend:**
- Python 3.8+
- FastAPI (async/await)
- Uvicorn (ASGI server)
- Pydantic (data validation)
- Google Generative AI (Gemini)

**Frontend:**
- Pure HTML5
- Pure CSS3 (no frameworks!)
- Vanilla JavaScript (ES6+)
- Google Fonts (Poppins, Quicksand)

## 📦 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Clone the Repository
```bash
git clone https://github.com/yourusername/hayya-ai.git
cd hayya-ai
```

### Install Dependencies
```bash
pip install -r req.txt
```

### Configure API Key (Optional - for Chatbot)
Edit `app.py` and add your Google Gemini API key:
```python
genai.configure(api_key="YOUR_API_KEY_HERE")
```

### Run the Application
```bash
python app.py
```

The server will start at `http://localhost:8000`

## 🌐 Usage

### Access the Apps

| Feature | URL | Description |
|---------|-----|-------------|
| **Original UI** | http://localhost:8000/index | Modern purple gradient theme |
| **Luna Cycle** | http://localhost:8000/luna | Soft pastel feminine theme |
| **Dark Luna** | http://localhost:8000/dark-luna | Elegant dark gradient theme |
| **Chatbot** | http://localhost:8000/chat-page | AI health companion |
| **Health Check** | http://localhost:8000/ | API status |
| **API Docs** | http://localhost:8000/docs | Interactive API documentation |

### Period Predictor - How to Use

1. **Enter Past Dates**: Input your previous period start dates (YYYY-MM-DD format)
   ```
   2025-07-01
   2025-07-29
   2025-08-27
   2025-09-25
   ```

2. **Set Lookback Cycles**: Choose how many recent cycles to consider (default: 6)

3. **Predict**: Click the predict button

4. **View Results**:
   - Predicted next period date
   - Mean cycle length
   - Confidence interval
   - Fertile window
   - Irregularity warnings (if any)

## 🔌 API Endpoints

### Prediction Endpoint
```http
POST /predict
Content-Type: application/json

{
  "past_starts": ["2025-07-01", "2025-07-29", "2025-08-27"],
  "lookback": 6
}
```

**Response:**
```json
{
  "predicted_date": "2025-11-20",
  "mean_cycle": 28.5,
  "std_dev": 1.3,
  "ci_lower": "2025-11-19",
  "ci_upper": "2025-11-21",
  "fertile_window_start": "2025-11-05",
  "fertile_window_end": "2025-11-13",
  "note": null
}
```

### Chatbot Endpoints
```http
GET /get-initial-message
POST /chat
```

## 📁 Project Structure

```
hayya.AI/
├── app.py                      # FastAPI backend server
├── req.txt                     # Python dependencies
├── .gitignore                  # Git ignore rules
│
├── index.html                  # Original UI
├── luna-cycle.html            # Luna Cycle UI (pastel)
├── dark-luna.html             # Dark Luna UI (gradient)
├── chat.html                  # Chatbot UI
│
├── static/
│   ├── style.css              # Chatbot styles
│   ├── chat.js                # Chatbot functionality
│   ├── luna-style.css         # Luna Cycle styles
│   ├── luna-script.js         # Luna Cycle functionality
│   ├── dark-luna-style.css    # Dark Luna styles
│   └── dark-luna-script.js    # Dark Luna functionality
│
└── docs/
    ├── README.md              # This file
    ├── QUICKSTART.md          # Quick start guide
    ├── FEATURES.md            # Feature documentation
    ├── LUNA_CYCLE_GUIDE.md   # Luna UI guide
    └── UI_COMPARISON.md       # UI comparison
```

## 🎨 UI Themes Comparison

| Theme | Colors | Style | Best For |
|-------|--------|-------|----------|
| **Original** | Purple/Blue | Modern, professional | General use |
| **Luna Cycle** | Pink/Lavender | Soft, pastel, glassmorphism | Feminine, wellness |
| **Dark Luna** | Black/Purple + Pink | Elegant, dramatic | Premium feel |

## 🧪 Testing

Run the API test suite:
```bash
python test_api.py
```

## 🔒 Security & Privacy

- ✅ No data stored permanently
- ✅ All calculations done server-side
- ✅ CORS enabled for security
- ✅ Input validation with Pydantic
- ⚠️ For production: Add HTTPS, authentication, and database encryption

## ⚠️ Medical Disclaimer

**This is an estimation tool only.**

- NOT for contraceptive purposes
- NOT a medical diagnosis
- NOT a substitute for professional medical advice
- Always consult a qualified healthcare provider for medical concerns

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work*

## 🙏 Acknowledgments

- Google Gemini AI for powering the chatbot
- FastAPI for the excellent async framework
- All contributors and users

## 📞 Support

For questions or issues, please open an issue on GitHub or contact:
- Email: your.email@example.com
- Website: https://yourwebsite.com

## 🔮 Future Enhancements

- [ ] User authentication and accounts
- [ ] Data persistence (database integration)
- [ ] Calendar export functionality
- [ ] Symptom tracking
- [ ] Mood logging
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Notification system

## 📊 Statistics

- **Lines of Code**: ~3,000+
- **UI Themes**: 3
- **API Endpoints**: 6
- **Languages**: Python, HTML, CSS, JavaScript

---

**Made with 💜 for women's health and wellness**

*Hayya.AI - Track your body. Understand your rhythm.* 💖

## 🌟 Star this repo if you find it helpful!
