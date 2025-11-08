// static/script.js

const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;

    appendMessage(messageText, 'user-message');
    messageInput.value = '';
    
    // Loading indicator (optional but good)
    const loadingMessage = appendMessage('...', 'ai-message');

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText })
        });

        // Remove loading message
        chatWindow.removeChild(loadingMessage);

        const data = await response.json();
        const aiResponseText = data.response || `Error: ${data.error}`;

        appendMessage(aiResponseText, 'ai-message');

    } catch (error) {
        // Remove loading message in case of error too
        if (loadingMessage.parentNode === chatWindow) {
            chatWindow.removeChild(loadingMessage);
        }
        console.error('Error:', error);
        appendMessage('Maaf kijiye, kuch masla ho gaya hai. Barah karam server check karen.', 'ai-message');
    }
}

function appendMessage(text, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    
    const p = document.createElement('p');
    p.textContent = text;
    
    messageDiv.appendChild(p);
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    
    return messageDiv; // Return the element for potential removal (like loading indicator)
}