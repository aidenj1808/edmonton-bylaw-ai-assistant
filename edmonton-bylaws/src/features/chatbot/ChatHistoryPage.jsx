import React, { useState } from 'react';
import '../CSS/ChatHistoryPage.css';
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx';
import ChatHistorySidebar from '../components/ChatHistorySidebar.jsx';
import ChatInput from '../components/ChatInput.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, switchToChatHistorySidebar, switchToOldSidebar } from '../../redux/chatHistoryReduer.js';

const ChatHistory = () => {
    const dispatch = useDispatch();
    const { isSidebarOpen, isChatHistorySidebar, selectedConversation } = useSelector(state => state.sidebar);
        
    return (
        <div className="chathistory">
            <Header toggleSidebar={() => dispatch(toggleSidebar())} />

            <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                    <ChatHistorySidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={() => dispatch(toggleSidebar())}
                        switchToOldSidebar={() => dispatch(switchToOldSidebar())}
                        onConversationSelect={(conv) => dispatch(setSelectedConversation())}
                    />
                ) : (
                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={() => dispatch(toggleSidebar())}
                        switchToChatHistorySidebar={() => dispatch(switchToChatHistorySidebar())}
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