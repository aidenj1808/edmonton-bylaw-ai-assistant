import React, { useState } from "react";
import './CSS/SearchBylawsPage.css'
import Header from "./components/Header.jsx";
import Sidebar from './components/Sidebar.jsx'
import ChatHistorySidebar from "./components/ChatHistorySidebar.jsx";

const SearchBylawsPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isChatHistorySidebar, setIsChatHistorySidebar] = useState(false);

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
        <div class ="searchbylawspage">
            <Header toggleSidebar={toggleSidebar}/>
            
            <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                <ChatHistorySidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToOldSidebar={switchToOldSidebar} />
                ) : (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToChatHistorySidebar={switchToChatHistorySidebar} />
                )}
    
              <div class = "inner">
               
              </div>
            </div>
        </div>
      );
};

export default SearchBylawsPage;
