import React, { useState } from "react";
import '../CSS/HomePage.css'
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx'
import ChatHistorySidebar from '../components/ChatHistorySidebar.jsx'
import ChatInput from "../components/ChatInput.jsx";

const HomePage = ({buttons}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isChatHistorySidebar, setIsChatHistorySidebar] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState([]);

    // this would be passed from the login
    const [userEmail] = useState("user@example.com");

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

      // Switch to the chat history sidebar
    const switchToChatHistorySidebar = () => {
        setIsChatHistorySidebar(true);
    };

    // Switch back to the original sidebar
    const switchToOldSidebar = () => {
        setIsChatHistorySidebar(false); 
    };

    return (
        <div class ="homepage">
            <Header toggleSidebar={toggleSidebar}/>
            
            <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                <ChatHistorySidebar 
                  isOpen={isSidebarOpen} 
                  toggleSidebar={toggleSidebar}
                  switchToOldSidebar={switchToOldSidebar}
                  buttons={buttons} 
                  setSelectedConversation={setSelectedConversation}
                  />
                ) : (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToChatHistorySidebar={switchToChatHistorySidebar} />
                )}

    
              <div class = "inner">
                <div class = "chatDiv">
                  <ChatInput
                    userEmail = {userEmail}
                    conversation = {selectedConversation}
                  />
                  </div>
              </div>
            </div>
        </div>
      );
};

export default HomePage;
