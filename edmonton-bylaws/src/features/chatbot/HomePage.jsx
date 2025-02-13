import React, { useState } from "react";
import '../CSS/HomePage.css'
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx'
import ChatHistorySidebar from '../components/ChatHistorySidebar.jsx'
import {Agent} from './Agent.js'

const HomePage = () => {
  //Using the agent
//   let helloPrompt = "Hello";
//   let snakePrompt = "Are you allowed to have a pet snake?";
//   const agent = new Agent();
//   let helloResponse = agent.askQuestion(helloPrompt);
//   console.log(helloResponse)
//   let snakeResponse = agent.askQuestion(snakePrompt);
//   console.log(snakeResponse)
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
        <div class ="homepage">
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

export default HomePage;
