function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("open");
}

function submitBackgroundInput() {
    let userInput = document.getElementById("background-input").value;
    if (userInput.trim() !== "") {
        alert("Background input submitted: " + userInput);
        document.getElementById("background-input").value = "";
    } else {
        alert("Please enter some text before submitting.");
    }
}

// Function to simulate chatbot response
function getBotResponse(userMessage) {
    // Simple predefined responses
    const responses = {
        "hello": "Hi! How can I assist you with Edmonton's bylaws today?",
        "what are bylaws?": "Bylaws are laws made by local governments to regulate activities within their jurisdiction.",
        "how can I get a permit?": "You can apply for a permit online or visit the local government office for assistance.",
        "default": "Sorry, I didn't understand that. Can you ask something else related to bylaws?"
    };

    // Normalize input (to lowercase) for comparison
    const lowerCaseMessage = userMessage.toLowerCase();
    return responses[lowerCaseMessage] || responses["default"];
}

// Function to send a message
function sendMessage() {
    const inputField = document.getElementById("userMessageInput");
    const userMessage = inputField.value.trim();

    if (userMessage) {
        // Display the user's message
        displayMessage(userMessage, 'user-message');
        
        // Get the chatbot's response and display it after a brief delay
        setTimeout(() => {
            const botMessage = getBotResponse(userMessage);
            displayMessage(botMessage, 'bot-message');
        }, 1000);

        // Clear the input field
        inputField.value = "";
    }
}

// Function to display a message in the chat area
function displayMessage(message, messageType) {
    const chatArea = document.getElementById("chatArea");
    
    // Create a new message div
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", messageType);
    messageDiv.textContent = message;

    // Append the message to the chat area
    chatArea.appendChild(messageDiv);

    // Auto-scroll to the bottom of the chat area
    chatArea.scrollTop = chatArea.scrollHeight;
}