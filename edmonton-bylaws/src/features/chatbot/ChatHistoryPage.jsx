import React, { useState } from 'react';
import '../CSS/ChatHistoryPage.css';
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx';
import ChatHistorySidebar from '../components/ChatHistorySidebar.jsx';
import ChatInput from '../components/ChatInput.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, switchToChatHistorySidebar, switchToOldSidebar, setSelectedConversation } from '../../redux/chatHistoryReduer.js';

const ChatHistory = () => {
    const { isSidebarOpen, isChatHistorySidebar, selectedConversation } = useSelector(state => state.chatHistory);

    //const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    //const [isChatHistorySidebar, setIsChatHistorySidebar] = useState(false);
    //const [selectedConversation, setSelectedConversation] = useState(null);

    // Toggle sidebar visibility
   /*  const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    }; */

    // Switch to the chat history sidebar
    /* const switchToChatHistorySidebar = () => {
        setIsChatHistorySidebar(true);
    }; */

    // Switch back to the original sidebar
    /* const switchToOldSidebar = () => {
        setIsChatHistorySidebar(false);
    }; */

    /* const handleConversationSelection = (conversation) => {
        setSelectedConversation(conversation);
        console.log("HISTORY PAGE. " + selectedConversation);
    }; */
        
    return (
        <div className="chathistory">
            <Header toggleSidebar={() => dispatch(toggleSidebar())} />

            <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                    <ChatHistorySidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        switchToOldSidebar={() => dispatch(switchToOldSidebar())}
                        onConversationSelect={(conv) => dispatch(setSelectedConversation)}
                    />
                ) : (
                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={() => dispatch(toggleSidebar)}
                        switchToChatHistorySidebar={() => dispatch(switchToChatHistorySidebar)}
                    />
                )}

                <div className="inner">
                    {selectedConversation !== null ? (
                        <div class="conversation-display">
                            <ChatInput/>
                        </div>
                    ) : (
                        <p>Select a topic to see the conversation.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatHistory;