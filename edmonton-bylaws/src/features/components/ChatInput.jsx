import React, { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa"; //https://react-icons.github.io/react-icons/search/#q=up%20arrow
import {ChatDTO, ConversationDTO} from "../chatbot/chatbot-dto" 
import {Agent} from "../chatbot/Agent.js"
import {createRoot} from 'react-dom/client'
import Markdown from 'https://esm.sh/react-markdown@10'
import { useLocation } from 'react-router-dom';

const ChatInput = ({userEmail, conversation}) => {
    const [inputValue, setInputValue] = useState('');
    const [buttonVisible, setButtonVisible] = useState(false);
    // stored values for data objects
    const [sequenceNumber, setSequenceNumber] = useState(1); 
    const [newConversation, setNewConversation] = useState(true);
    const [conversationId, setConversationID] = useState('');
    const [lastChatDTO, setLastChatDTO] = useState(null);
    const [response, setResponse] = useState('');
    // stored values to manage front end
    const [messages, setMessages] = useState([]);
    const [reset, setReset] = useState(0);
    const location = useLocation();
    const chatRef = useRef(null); // Create a reference to chats for scroll
    // tracks mount (api calls arnt made on mount)
    const hasMounted = useRef(false);

    const agent = new Agent();

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
            handleResponse(inputValue);

            // Create a new ChatDTO with the current sequence number
            const chatDTO = new ChatDTO(inputValue, '', sequenceNumber);

            // Store DTO to update response later
            setLastChatDTO(chatDTO);

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

    const createConversation = async (conversation) => {
        try{
            const response = await fetch("http://localhost:5002/chats", {
                method: 'POST', // Specify the method
                headers: {
                'Content-Type': 'application/json', // Ensure content type is JSON
                },
                body: JSON.stringify(conversation),
            });

            if (!response.ok) {
                throw new Error('Error creating conversation');
              }

            const data = await response.json();
            //if (data.conversation._id != null){
                setConversationID(data.conversation._id);
                setNewConversation(false);
                return data.conversation._id;
            //}
        } catch(error){

        }
    }

    const storeChat = async (chat) => {
        let chatWithConvoRef = chat;
        if (chat.conversationRef == '' || chat.conversationRef == null){
            chatWithConvoRef = {...chat, conversationRef: conversationId};
        }
        try{
            const response = await fetch("http://localhost:5002/chats/chat/", {
                method: 'POST', // Specify the method
                headers: {
                'Content-Type': 'application/json', // Ensure content type is JSON
                },
                body: JSON.stringify(chatWithConvoRef),
            });

            if (!response.ok) {
                throw new Error('Error storing chat');
            }
            const data = await response.json();
            return data.chat.prompt;
        } catch(error){

        }
    }

    const updateConversation = async (updateValues) => {
        console.log("updating: " + JSON.stringify(updateValues));
        try{
            const response = await fetch("http://localhost:5002/chats/conversationReference/", {
                method: 'PUT', // Specify the method
                headers: {
                'Content-Type': 'application/json', // Ensure content type is JSON
                },
                body: JSON.stringify(updateValues),
            });

            if (!response.ok) {
                throw new Error('Error updating conversation data');
              }
        } catch(error){

        }
    }

    useEffect(() => { // Response has been recieved, now we can store data
        const runAsyncFunctions = async (conversation) => { // Enforces createConversation completing before storeChat
            const id = await createConversation(conversation);
            lastChatDTO.conversationRef = id;
            setConversationID(id);
            const prompt = await storeChat(lastChatDTO);
            //console.log("update summary to : " + prompt);
            await updateConversation({summary: prompt, conversationRef: id});
        };

        if (!hasMounted.current) { // skip if the change is just the value being mounted
            hasMounted.current = true;
            return; 
        }

        if (lastChatDTO != null && newConversation == false){
            lastChatDTO.response = response;
            storeChat(lastChatDTO);
        }
        // First chat in the sequence 
        else if (lastChatDTO != null && newConversation == true){
            lastChatDTO.response = response;
            const conversation = new ConversationDTO(userEmail);
            runAsyncFunctions(conversation);
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

    useEffect(() => { // Reset Visuals When new chat history is selected
        if (!hasMounted.current) { // skip if the change is just the value being mounted
            hasMounted.current = true;
            return; 
        }
        if(lastChatDTO!= null){
            lastChatDTO.conversationRef = conversationId;
        }
    }, [conversationId]);


    useEffect(() => { // New conversation is started 
        console.log("This is now a new conversation");
        setNewConversation(true); // Rest conversation identifier
        setSequenceNumber(1); // Reset counter when the component mounts
      }, [location.key]);

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
                    {msg.text ? (msg.sender === "bot" ? <Markdown>{msg.text}</Markdown> : msg.text): <div style={styles.loadingDots}><LoadingDots /></div>}
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
        maxHeight: "70vh",
        maxWidth: "75vw",
    },
    message: {
        padding: "10px",
        borderRadius: "15px",
        wordBreak: "break-word",
        animation: "fadeIn 0.3s ease-in forwards",
        maxWidth: "65%",
        textAlign: "left",
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