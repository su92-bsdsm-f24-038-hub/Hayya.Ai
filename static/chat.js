// static/chat.js - Chatbot functionality

// HTML elements
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

const API_BASE_URL = 'http://localhost:8000';

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Load initial AI message when page loads
document.addEventListener('DOMContentLoaded', async () => {
    showTypingIndicator();
    try {
        const response = await fetch(`${API_BASE_URL}/get-initial-message`);
        const data = await response.json();
        appendMessage(data.response, 'ai-message');
    } catch (error) {
        console.error("Initial message fetch error:", error);
        appendMessage("Hello! I'm Hayya. How can I help you today?", 'ai-message');
    } finally {
        hideTypingIndicator();
    }
});

async function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;

    // Display user's message immediately
    appendMessage(messageText, 'user-message');
    messageInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    try {
        // Send async request to backend
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText })
        });

        if (!response.ok) {
            throw new Error('Failed to get response from server');
        }

        const data = await response.json();
        const aiResponseText = data.response || data.error;

        // Display AI's response
        appendMessage(aiResponseText, 'ai-message');

    } catch (error) {
        console.error('Error:', error);
        appendMessage("Sorry, I'm having trouble connecting. Please try again later.", 'ai-message');
    } finally {
        // Hide typing indicator after response
        hideTypingIndicator();
    }
}

function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    
    const p = document.createElement('p');
    p.innerText = text;
    
    messageDiv.appendChild(p);
    chatWindow.appendChild(messageDiv);

    // Scroll to newest message
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
    typingIndicator.style.display = 'block';
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}
