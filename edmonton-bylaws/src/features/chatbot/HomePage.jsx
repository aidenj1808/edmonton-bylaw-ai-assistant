import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import '../CSS/HomePage.css'
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx'
import ChatHistorySidebar from '../components/ChatHistorySidebar.jsx'
import ChatInput from "../components/ChatInput.jsx";
import { useUser } from "../../UserProvider.jsx";

const HomePage = ({buttons}) => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedConversation, setSelectedConversation] = useState([]);
    const [selectedConversationData, setSelectedConversationData] = useState(location.state.data || {});
    const [isChatHistorySidebar, setIsChatHistorySidebar] = useState(location.state.sidebar || false);
    const { user, setUser } = useUser();

    // Extract the passed state (buttons or dataStored)
    useEffect(() => {
      if (location.state?.selected) {
        setSelectedConversation(location.state.selected);
        console.log("Selected Conversation: " +selectedConversation)
      }
      if (location.state?.data){
        setSelectedConversationData(location.state.data);
        console.log("Conversation Data: "+ JSON.stringify(selectedConversationData));
      }
    }, [location.state?.selected]);

    useEffect(()=>{
      console.log("HOME Conversation Data: " + JSON.stringify(selectedConversationData));
    },[selectedConversationData])

    // this would be passed from the login
    const [userEmail] = useState(user.email);

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
                  setSelectedConversationData={setSelectedConversationData}
                  />
                ) : (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToChatHistorySidebar={switchToChatHistorySidebar} />
                )}

    
              <div class = "inner">
                <div class = "chatDiv">
                  <ChatInput
                    userEmail = {userEmail}
                    conversation = {selectedConversation}
                    passedConversationData = {selectedConversationData}
                  />
                  </div>
              </div>
            </div>
        </div>
      );
};

export default HomePage;
