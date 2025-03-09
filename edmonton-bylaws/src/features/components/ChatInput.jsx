import React, { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa"; //https://react-icons.github.io/react-icons/search/#q=up%20arrow
import {ChatDTO} from "../chatbot/chatbot-dto" 
import {Agent} from "../chatbot/Agent.js"


const ChatInput = ({userEmail, conversation}) => {
    const [inputValue, setInputValue] = useState('');
    const [buttonVisible, setButtonVisible] = useState(false);
    const [sequenceNumber, setSequenceNumber] = useState(1); 
    const [messages, setMessages] = useState([]);
    const [reset, setReset] = useState(0);
    const [lastChatDTO, setLastChatDTO] = useState(null);
    const [response, setResponse] = useState('');

    const agent = new Agent();
    const chatRef = useRef(null); // Create a reference to chats for scroll

    async function handleResponse(prompt) {
        setResponse(await agent.answerPrompt(prompt));
    }

    const resetComponent = () => {
        setReset(prev => prev + 1); // Reset state
    };

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setButtonVisible(newValue.trim() !== '');
    };

    const handleSubmit = () => {    
        // Increment sequence number for next message
        setSequenceNumber((prev) => prev + 1);
    
        try{
            // Await agent and then set response
            let response = handleResponse(inputValue);

            // Create a new ChatDTO with the current sequence number
            const chatDTO = new ChatDTO(userEmail, inputValue, '', sequenceNumber);

            // Store DTO to update response later
            setLastChatDTO(chatDTO);

            // Increment sequence number for next message
            setSequenceNumber((prev) => prev + 1);

            // for visual chat
            const userMessage = { text: inputValue, sender: "user" };
            const botMessage =  { text: '', sender: "bot" };

            setMessages((prev) => [...prev, userMessage, botMessage]);           

            // Clear input
            setInputValue("");
        }
        catch(error){
            const botMessage = { text: "Failed to reach server. Please try again", sender: "bot" };
        }
    };

    useEffect(() => {
        // Once response is complete update the DTO
        if (lastChatDTO != null){
            lastChatDTO.response = response;
        }
        // Update the last bot message with the actual response

        setMessages((prev) =>
            prev.map((msg, index) =>
                index === prev.length - 1 ? { ...msg, text: response } : msg
            )
        );

        // Save to local Storage
        saveToLocalStorage(lastChatDTO);
        console.log("Saved:", lastChatDTO);
        }, [response])

    useEffect(() => {
        console.log(messages);

        if (chatRef.current) {
        chatRef.current.scrollIntoView({behaviour: "smooth", transition: "transform 0.3s ease"}); // Auto-scroll to bottom
        }
    }, [messages]); 

    async function saveToLocalStorage(newItem) {
        // Retrieve existing data or initialize an empty array
        const existingData = JSON.parse(localStorage.getItem("chatDTOs")) || [];
    
        // Append new data
        existingData.push(newItem);
            
        // Save updated array back to local storage
        localStorage.setItem("chatDTOs", JSON.stringify(existingData));
        
    };

    const loadHistory = (conversation) => {
        if (conversation != []){
            conversation.forEach(element => {
                const userMessage = { text: element.prompt, sender: "user" };
                const botMessage = { text: element.response, sender: "bot" };

                setMessages((prev) => [...prev, userMessage, botMessage]);
            });
        }
    };

    useEffect(() => { // Reset Visuals When new chat history is selected
        resetComponent(reset + 1);
        setMessages([]);
        loadHistory(conversation);
    }, [conversation]);

    const LoadingDots = () => (
        <>
          <span style={{ ...styles.dot, animationDelay: "0s" }}></span>
          <span style={{ ...styles.dot, animationDelay: "0.2s" }}></span>
          <span style={{ ...styles.dot, animationDelay: "0.4s" }}></span>
          <style>
            {`
              @keyframes blink {
                0% { opacity: 0.2; }
                20% { opacity: 1; }
                100% { opacity: 0.2; }
              }
            `}
          </style>
        </>
      );      

    return (
        <div class = "chatDiv" style={styles.chatDiv} key={reset}>

        <div style={styles.messagesContainer}>
            <h1 style={styles.h1}>Welcome to the City of Edmonton Bylaw AI Assistant</h1>
            <p>Ask any question regarding Edmonton's bylaws, and we'll assist you.</p>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    style={{
                    ...styles.message,
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    backgroundColor: msg.sender === "user" ? "#005087" : "#E5E5EA",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    }}
                    >
                    {msg.text ? msg.text : <div style={styles.loadingDots}><LoadingDots /></div>}
                    <div ref={chatRef} />
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
            <span className="disclaimer">*Disclaimer: AI is experimental, messages may be inaccurate and provided advice are not legally verified</span>
        </div>
    );
};



const styles = {
    h1: {
        paddingTop: "15px",
        alignText: "Center",
        margin: "auto",
        display: "flex",
    },
    input: {
        width: "40vw", 
        margin: "10px",
        padding: "20px",
        boxSizing: "border-box",
        borderRadius: "20px",
        border: "2px solid black",
    },
    button: {
        position: "relative",
        top: "20px",
        background: "none",
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
        paddingLeft: "4rem",
        paddingRight: "4rem",
        maxHeight: "75vh",
        maxWidth: "75vw",
    },
    message: {
        padding: "10px",
        borderRadius: "15px",
        wordBreak: "break-word",
        animation: "fadeIn 0.3s ease-in forwards",
        maxWidth: "65%",
        alignText: "left",
    },
    dot: {
        width: "6px",
        height: "6px",
        backgroundColor: "#888",
        borderRadius: "50%",
        animation: "blink 1.4s infinite",
    },
    loadingDots: {
        background: "none",
        display: "inline-flex",
        gap: "3px",
    },
};

export default ChatInput;