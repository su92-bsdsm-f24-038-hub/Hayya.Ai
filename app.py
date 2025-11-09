# app.py - Hayya.AI Backend with FastAPI

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import statistics
import google.generativeai as genai

app = FastAPI()

# CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini AI configuration for chatbot
try:
    genai.configure(api_key="AIzaSyCENWeW9so8zX0fCTPChY2a3z-0fJ3oet0")
    model = genai.GenerativeModel('gemini-2.0-flash')
    print("AI Model loaded successfully.")
except Exception as e:
    print(f"FATAL: Could not configure Gemini AI. Error: {e}")
    model = None

AI_PERSONALITY_PROMPT = (
    "You are 'Hayya', a caring, discreet, and knowledgeable AI assistant for a women's health app. "
    "Your personality is like a wise, empathetic older sister or a trusted friend. "
    "Your communication style must be in clear, simple, and gentle English. "
    "You are designed to be a safe space for users. "
    "CRITICAL RULE: Always include a short, friendly disclaimer in your responses that you are an AI and not a medical professional, and users should consult a doctor for medical advice. Example: '(Remember, I'm an AI friend, so please consult a doctor for medical advice!)' "
    "NEVER provide a medical diagnosis. You can provide general, well-known health information but not specific diagnoses. "
    "Here is the user's question, respond to it according to this personality: "
)

# Pydantic models for request/response validation
class PredictRequest(BaseModel):
    past_starts: List[str]
    lookback: Optional[int] = 6

class PredictResponse(BaseModel):
    predicted_date: str
    mean_cycle: float
    std_dev: float
    ci_lower: str
    ci_upper: str
    fertile_window_start: str
    fertile_window_end: str
    note: Optional[str] = None

class ChatRequest(BaseModel):
    message: str

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Health check endpoint
@app.get("/")
async def health_check():
    return {"status": "ok", "message": "Hayya.AI Backend is running"}

# Serve the main HTML page
@app.get("/index")
async def serve_index():
    return FileResponse("index.html")

# Serve the Luna Cycle page (pastel UI)
@app.get("/luna")
async def serve_luna():
    return FileResponse("luna-cycle.html")

# Serve the Dark Luna Cycle page (black + purple gradient UI)
@app.get("/dark-luna")
async def serve_dark_luna():
    return FileResponse("dark-luna.html")

# Serve the chatbot page
@app.get("/chat-page")
async def serve_chat():
    return FileResponse("chat.html")

# Serve the privacy policy page
@app.get("/privacy-policy")
async def serve_privacy_policy():
    return FileResponse("privacy-policy.html")

# Period Predictor endpoint (async)
@app.post("/predict", response_model=PredictResponse)
async def predict_period(request: PredictRequest):
    """
    Asynchronous endpoint to predict next menstrual cycle based on past data.
    
    Args:
        request: Contains past_starts (list of date strings) and optional lookback
    
    Returns:
        PredictResponse with prediction details
    """
    try:
        past_starts = request.past_starts
        lookback = request.lookback or 6
        
        # Validate input
        if not past_starts or len(past_starts) == 0:
            raise HTTPException(status_code=400, detail="No past dates provided")
        
        # Parse and sort dates
        try:
            dates = [datetime.strptime(date_str.strip(), "%Y-%m-%d") for date_str in past_starts]
            dates.sort()
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
        
        last_start = dates[-1]
        
        # Handle single date case
        if len(dates) == 1:
            mean_cycle = 28.0  # Default cycle length
            std_dev = 0.0
            predicted_date = last_start + timedelta(days=int(mean_cycle))
            note = "Only one date provided. Using standard 28-day cycle."
        else:
            # Calculate cycle lengths
            cycle_lengths = [(dates[i+1] - dates[i]).days for i in range(len(dates)-1)]
            
            # Apply lookback window
            recent_cycles = cycle_lengths[-lookback:] if len(cycle_lengths) > lookback else cycle_lengths
            
            # Calculate statistics
            mean_cycle = statistics.mean(recent_cycles)
            std_dev = statistics.stdev(recent_cycles) if len(recent_cycles) > 1 else 0.0
            
            # Predict next period
            predicted_date = last_start + timedelta(days=int(mean_cycle))
            
            # Check for irregularity
            note = "Your cycles appear irregular. Consider consulting a healthcare provider." if std_dev > 6 else None
        
        # Calculate confidence interval (± 1 standard deviation)
        ci_lower_date = predicted_date - timedelta(days=int(std_dev))
        ci_upper_date = predicted_date + timedelta(days=int(std_dev))
        
        # Calculate fertile window (ovulation ~14 days before next period ± 4 days)
        ovulation_date = predicted_date - timedelta(days=14)
        fertile_start = ovulation_date - timedelta(days=4)
        fertile_end = ovulation_date + timedelta(days=4)
        
        # Format response
        return PredictResponse(
            predicted_date=predicted_date.strftime("%Y-%m-%d"),
            mean_cycle=round(mean_cycle, 1),
            std_dev=round(std_dev, 1),
            ci_lower=ci_lower_date.strftime("%Y-%m-%d"),
            ci_upper=ci_upper_date.strftime("%Y-%m-%d"),
            fertile_window_start=fertile_start.strftime("%Y-%m-%d"),
            fertile_window_end=fertile_end.strftime("%Y-%m-%d"),
            note=note
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# Chatbot: Initial message
@app.get("/get-initial-message")
async def get_initial_message():
    if model is None:
        return {"response": "Hello! I'm Hayya. It seems my AI connection is having a little trouble right now, but I'm here to chat."}
    try:
        initial_prompt = "As 'Hayya', your defined AI personality, generate a warm, single-paragraph welcome message inviting the user to talk about their health and wellness. Start with 'Hello!' or 'Assalamu Alaikum!'."
        response = model.generate_content(initial_prompt)
        return {"response": response.text}
    except Exception as e:
        print(f"Error generating initial message: {e}")
        return {"response": "Hello, I'm Hayya! Welcome to our safe space."}

# Chatbot: Chat endpoint
@app.post("/chat")
async def chat(request: ChatRequest):
    user_message = request.message
    if not user_message or model is None:
        raise HTTPException(status_code=500, detail="I'm sorry, I'm unable to process messages right now.")
    
    try:
        prompt = AI_PERSONALITY_PROMPT + user_message
        response = model.generate_content(prompt)
        return {"response": response.text}
    except Exception as e:
        print(f"Error during AI generation: {e}")
        raise HTTPException(status_code=500, detail="I'm having a little trouble thinking. Could you try rephrasing?")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)