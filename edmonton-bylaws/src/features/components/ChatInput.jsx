import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa"; //https://react-icons.github.io/react-icons/search/#q=up%20arrow
import {ChatDTO} from "../chatbot/chatbot-dto" 
import {Agent} from "../chatbot/Agent.js"


const ChatInput = (userEmail) => {
    const [inputValue, setInputValue] = useState('');
    const [buttonVisible, setButtonVisible] = useState(false);
    const [chatHistory, setChatHistory] = useState([]);
    const [messages, setMessages] = useState([]);
    const [sequenceNumber, setSequenceNumber] = useState(1); 

   const agent = new Agent();

    async function setResponse(prompt) {
        return await agent.askQuestion(prompt)
    }

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setButtonVisible(newValue.trim() !== '');
      };

      const handleSubmit = () => {    
        // Increment sequence number for next message
        setSequenceNumber((prev) => prev + 1);
    
        // Await agent and then set response
        //let response = setResponse(inputValue);
        let response = 'AI Response';

        // Create a new ChatDTO with the current sequence number
        const chatDTO = new ChatDTO(userEmail, inputValue, response, sequenceNumber);
    
        // Increment sequence number for next message
        setSequenceNumber((prev) => prev + 1);
    

        // for visual chat ** Add response
        const userMessage = { text: inputValue, sender: "user" };
        const botMessage = { text: response, sender: "bot" };

        setMessages((prev) => [...prev, userMessage, botMessage]);

        // Update chat history
        setChatHistory((prev) => [...prev, chatDTO]);
    
        const updatedChatHistory = [...chatHistory, chatDTO];

        // Clear input
        setInputValue("");

        console.log("Saved:", chatDTO);
        localStorage.setItem("chatDTOs", JSON.stringify(updatedChatHistory));
        console.log("Chat History", updatedChatHistory);

        setInputValue("")
      };
    

    return (
        <div class = "chatDiv" style={styles.chatDiv}>

        <div style={styles.messagesContainer}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    style={{
                    ...styles.message,
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    backgroundColor: msg.sender === "user" ? "#005087" : "#E5E5EA",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    }}>
                    {msg.text}
                </div>
            ))}
        </div>

            <div class ="inputDiv" styles={styles.div}>
                <input 
                    id = "chatInput"
                    value = {inputValue}
                    onChange={handleInputChange} 
                    style = {styles.input} placeholder = "Ask Edmonton Bylaws anything...">
                </input>
                {buttonVisible && (
                <button 
                    id = "chatButton" 
                    type = "submit" 
                    style = {styles.button}
                    onClick={handleSubmit}>
                    <FaArrowUp style = {styles.buttonIconStyle}/>
                </button>)}
            </div>
        </div>
    );
};



const styles = {
    input: {
        width: "40vw", // Choose width needed for your screen
        margin: "10px",
        padding: "20px",
        boxSizing: "border-box",
        borderRadius: "20px",
        border: "2px solid black",

    },
    button: {
        position: "relative",
        top: "20px",
        backgroundColor: "white",
        fontSize: "1vw",
    },
    buttonIconStyle: {
        fill: "white",
        fontSize: "50px",
        backgroundColor: "#005087",
        borderRadius: "14%"
    },
    messagesContainer: {
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "2vh",
        paddingLeft: "5vw",
      },
      chatContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        overflow: "hidden",
      },
      message: {
        padding: "10px",
        borderRadius: "15px",
        wordBreak: "break-word",
        animation: "fadeIn 0.3s ease-in forwards",
        maxWidth: "65%",
        alignText: "left",
      },
};

export default ChatInput;