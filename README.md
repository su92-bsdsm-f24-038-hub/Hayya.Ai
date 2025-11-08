# 🌸 Hayya.AI - Period Predictor & Health Companion

A complete asynchronous web application that helps users track and predict their menstrual cycle dates using previous cycle data, along with an AI-powered health chatbot companion.

## ✨ Features

### 1. Period Predictor
- **Cycle Prediction**: Predict your next period date based on historical data
- **Statistical Analysis**: Calculate mean cycle length and standard deviation
- **Confidence Interval**: Get a date range with ±1 standard deviation
- **Fertile Window**: Estimate your fertile window for family planning
- **Irregularity Detection**: Automatically detect irregular cycles (std dev > 6 days)
- **Flexible Input**: Support for comma or line-separated date entries

### 2. AI Health Chatbot (Hayya)
- **Caring AI Assistant**: Chat with Hayya, your empathetic health companion
- **General Health Guidance**: Get answers to women's health questions
- **Safe Space**: Discreet and knowledgeable responses
- **Medical Disclaimer**: Always reminds users to consult healthcare professionals

## 🏗️ Project Structure

```
hayya.AI/
├── app.py                 # FastAPI backend with async endpoints
├── index.html            # Period Predictor interface
├── chat.html             # Chatbot interface
├── req.txt               # Python dependencies
├── static/
│   ├── style.css         # Chatbot styles
│   ├── script.js         # Original script (legacy)
│   └── chat.js           # Chatbot functionality
└── README.md             # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "c:\Users\User\Desktop\hayya.AI"
   ```

2. **Create a virtual environment (recommended)**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment**
   - Windows PowerShell:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - Windows Command Prompt:
     ```cmd
     venv\Scripts\activate.bat
     ```

4. **Install dependencies**
   ```bash
   pip install -r req.txt
   ```

### Running the Application

1. **Start the FastAPI backend server**
   ```bash
   python app.py
   ```
   
   The server will start at `http://localhost:8000`

2. **Access the applications**
   - Period Predictor: Open your browser and go to `http://localhost:8000/index`
   - Chatbot: Go to `http://localhost:8000/chat-page`
   - Health Check: `http://localhost:8000/` (returns {"status": "ok"})

## 📝 How to Use

### Period Predictor

1. **Enter Past Dates**: Input your previous period start dates in YYYY-MM-DD format
   - One date per line, OR
   - Comma-separated dates
   
   Example:
   ```
   2025-07-01
   2025-07-29
   2025-08-27
   2025-09-25
   ```

2. **Set Lookback Cycles** (Optional): Choose how many recent cycles to consider (default: 6)

3. **Click "Predict Next Period"**: The app will calculate and display:
   - Predicted next period date
   - Mean cycle length
   - Standard deviation
   - Confidence interval (date range)
   - Fertile window (for family planning)
   - Irregularity note (if applicable)

### AI Chatbot

1. Navigate to the chat page
2. Type your health-related question in the input box
3. Press Enter or click the send button
4. Hayya will respond with helpful, empathetic guidance
5. Remember: Always consult a doctor for medical advice!

## 🔧 Technical Details

### Backend (FastAPI)

**Async Endpoints:**
- `GET /` - Health check endpoint
- `POST /predict` - Period prediction endpoint
- `GET /get-initial-message` - Chatbot welcome message
- `POST /chat` - Chatbot conversation endpoint

**Prediction Algorithm:**
1. Parse and sort input dates
2. Calculate cycle lengths (differences between consecutive dates)
3. Apply lookback window to recent cycles
4. Compute mean and standard deviation
5. Predict next date: last_start + mean_cycle
6. Calculate confidence interval: ± 1 std dev
7. Estimate fertile window: ovulation (~14 days before) ± 4 days

**Special Cases:**
- Single date: Uses default 28-day cycle
- Irregular cycles (std dev > 6): Includes warning note

### Frontend

**Technologies:**
- Pure HTML5, CSS3, JavaScript (ES6+)
- Async/await with fetch() API
- No external frameworks required

**Design:**
- Responsive layout (mobile & desktop)
- Soft pastel color scheme (lavender, pink, sky blue)
- Smooth animations and transitions
- Loading indicators for async operations
- Clean, modern UI with rounded corners and shadows

## 🔒 Privacy & Security

- All calculations are performed locally on your device
- No data is stored permanently on the server
- The chatbot uses Google's Gemini AI (requires API key)
- For production use, implement proper authentication and HTTPS

## ⚠️ Important Disclaimer

**This is an estimation tool only.** 

The predictions are based on statistical calculations from your input data and should not be used as:
- A contraceptive method
- Medical diagnosis
- Substitute for professional medical advice

**Always consult a qualified healthcare provider for:**
- Medical concerns
- Irregular cycles
- Family planning decisions
- Any health-related issues

## 🛠️ Troubleshooting

### Backend won't start
- Ensure all dependencies are installed: `pip install -r req.txt`
- Check if port 8000 is already in use
- Verify Python version: `python --version` (should be 3.8+)

### Frontend can't connect to backend
- Verify backend is running on `http://localhost:8000`
- Check browser console for CORS errors
- Ensure you're accessing the correct URL

### Chatbot not responding
- Check your Gemini API key in `app.py`
- Verify internet connection
- Check backend console for error messages

## 🔮 Future Enhancements

- [ ] Data persistence (save user history)
- [ ] Export predictions to calendar
- [ ] Symptom tracking integration
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] User authentication
- [ ] Encrypted data storage

## 📄 License

This project is for educational and personal use.

## 👥 Support

For questions or issues, please consult the documentation or seek help from a qualified developer.

---

**Made with 💜 for women's health and wellness**

*Hayya.AI - Your caring companion for health tracking*
