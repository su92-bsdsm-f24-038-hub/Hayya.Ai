// static/script.js

// HTML elements ko select karen
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Jab page load ho, to AI se pehla message mangwayen
document.addEventListener('DOMContentLoaded', async () => {
    showTypingIndicator();
    try {
        const response = await fetch('/get-initial-message');
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

    // User ka message foran display karen
    appendMessage(messageText, 'user-message');
    messageInput.value = '';

    // Typing indicator dikhayen
    showTypingIndicator();

    try {
        // Server ko request bhejen
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText })
        });

        const data = await response.json();
        const aiResponseText = data.response || data.error;

        // AI ka jawab display karen
        appendMessage(aiResponseText, 'ai-message');

    } catch (error) {
        console.error('Error:', error);
        appendMessage("Sorry, I'm having trouble connecting. Please try again later.", 'ai-message');
    } finally {
        // Jawab milne ke baad typing indicator chupayen
        hideTypingIndicator();
    }
}

function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    
    // Line breaks ko maintain karne ke liye innerText ke bajaye <p> tag istemal karen
    const p = document.createElement('p');
    p.innerText = text; // innerText line breaks ko aqlmandi se handle karta hai
    
    messageDiv.appendChild(p);
    chatWindow.appendChild(messageDiv);

    // Naye message tak scroll karen
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showTypingIndicator() {
    typingIndicator.style.display = 'block';
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}