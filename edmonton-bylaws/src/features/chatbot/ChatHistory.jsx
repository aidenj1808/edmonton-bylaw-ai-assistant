import React, { useState } from 'react';
import '../CSS/ChatHistory.css';
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx';
import ChatHistorySidebar from '../components/ChatHistorySidebar.jsx';

const ChatHistory = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isChatHistorySidebar, setIsChatHistorySidebar] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState(null);

    // Conversations data for each topic
    const conversations = {
        'Parking Regulations in Edmonton': [
            { sender: 'user', text: 'What are the parking rules in Edmonton?' },
            { sender: 'bot', text: 'In Edmonton, parking rules vary by zone. Make sure to check the signs.' },
            { sender: 'user', text: 'Are there specific areas where parking is prohibited?' },
            { sender: 'bot', text: 'Yes, certain areas such as near fire hydrants and bus stops prohibit parking.' },
        ],
        'Noise Complaints and Bylaws': [
            { sender: 'user', text: 'How do I file a noise complaint?' },
            { sender: 'bot', text: 'You can file a noise complaint by contacting the local authorities or online.' },
            { sender: 'user', text: 'What hours are noise complaints typically handled?' },
            { sender: 'bot', text: 'Complaints are typically handled during business hours, but urgent cases can be reported 24/7.' },
        ],
        'Residential Zoning Rules': [
            { sender: 'user', text: 'What are the zoning rules for residential properties?' },
            { sender: 'bot', text: 'Residential zoning rules vary by neighborhood. Check the local zoning maps for specific details.' },
        ],
        'Business Licensing Requirements': [
            { sender: 'user', text: 'What do I need to get a business license?' },
            { sender: 'bot', text: 'You will need to provide your business name, location, and type of business. Additionally, there may be local regulations.' },
        ],
        'Pet Ownership Bylaws': [
            { sender: 'user', text: 'Are there specific rules for pet ownership?' },
            { sender: 'bot', text: 'Yes, there are rules regarding the number of pets, their care, and behavior, especially in apartment buildings.' },
        ],
        'Snow Removal and Sidewalk Clearing': [
            { sender: 'user', text: 'Who is responsible for snow removal on sidewalks?' },
            { sender: 'bot', text: 'Property owners are generally responsible for clearing sidewalks within a certain time frame after a snowfall.' },
        ],
        'Property Maintenance Standards': [
            { sender: 'user', text: 'What are the property maintenance standards?' },
            { sender: 'bot', text: 'Property maintenance standards include keeping the yard free of garbage, trimming trees, and ensuring that buildings are well-maintained.' },
        ],
        'Landlord and Tenant Responsibilities': [
            { sender: 'user', text: 'What are the responsibilities of landlords and tenants?' },
            { sender: 'bot', text: 'Landlords must maintain the property and ensure it is safe for tenants. Tenants must pay rent on time and keep the property clean.' },
        ],
        'Fire Pit and Outdoor Burning Rules': [
            { sender: 'user', text: 'Are there rules for using fire pits outdoors?' },
            { sender: 'bot', text: 'Yes, fire pits must be a certain distance from structures, and certain materials are prohibited.' },
        ],
        'Public Events and Noise Permits': [
            { sender: 'user', text: 'Do I need a permit for a public event with loud music?' },
            { sender: 'bot', text: 'Yes, most public events require a noise permit if they exceed certain decibel levels or occur during restricted hours.' },
        ],
    };

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

    // Handle topic click
    const handleTopicClick = (topic) => {
        setSelectedConversation(conversations[topic] || []);
    };

    return (
        <div className="chathistory">
            <Header toggleSidebar={toggleSidebar} />

            <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                    <ChatHistorySidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        switchToOldSidebar={switchToOldSidebar}
                        onTopicClick={handleTopicClick}
                    />
                ) : (
                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        switchToChatHistorySidebar={switchToChatHistorySidebar}
                    />
                )}

                <div className="inner">
                    {selectedConversation ? (
                        <div className="conversation-display">
                            {selectedConversation.map((message, index) => (
                                <div key={index} className={message.sender === 'bot' ? 'bot-message' : 'user-message'}>
                                    <strong>{message.sender}:</strong> {message.text}
                                </div>
                            ))}
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
