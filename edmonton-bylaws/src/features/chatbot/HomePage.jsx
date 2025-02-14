import React, { useState } from "react";
import '../CSS/HomePage.css'
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx'
import ChatHistorySidebar from '../components/ChatHistorySidebar.jsx'
import ChatInput from "../components/ChatInput.jsx";

const HomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isChatHistorySidebar, setIsChatHistorySidebar] = useState(false);


    // this would be passed from the login
    const [userEmail] = useState("user@example.com");

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

      // Switch to the chat history sidebar
    const switchToChatHistorySidebar = () => {
        setIsChatHistorySidebar(true);  // Switch to new sidebar
    };

    // Switch back to the original sidebar
    const switchToOldSidebar = () => {
        setIsChatHistorySidebar(false); // Switch back to the original sidebar
    };

    return (
        <div class ="homepage">
            <Header toggleSidebar={toggleSidebar}/>
            
            <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                <ChatHistorySidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToOldSidebar={switchToOldSidebar}/>
                ) : (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToChatHistorySidebar={switchToChatHistorySidebar} />
                )}

    
              <div class = "inner">
                <h1>Welcome to the City of Edmonton Bylaw Chatbot</h1>
                <p>Ask any question regarding Edmonton's bylaws, and we'll assist you.</p>
                <div class = "chatDiv">
                  <ChatInput
                    userEmail = {userEmail}
                    />
                  </div>
              </div>
            </div>
        </div>
      );
};

export default HomePage;
