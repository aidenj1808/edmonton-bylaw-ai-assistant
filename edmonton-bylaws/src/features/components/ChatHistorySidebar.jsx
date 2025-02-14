import React from "react";
import "../CSS/Sidebar.css"; // Sidebar styles

function ChatHistorySidebar({ isOpen, switchToOldSidebar, onTopicClick }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><button onClick={switchToOldSidebar}>← Back</button></li>
      </ul>
      <div className="chat-sidebar">
        <ul>
          {[
            'Parking Regulations in Edmonton',
            'Noise Complaints and Bylaws',
            'Residential Zoning Rules',
            'Business Licensing Requirements',
            'Pet Ownership Bylaws',
            'Snow Removal and Sidewalk Clearing',
            'Property Maintenance Standards',
            'Landlord and Tenant Responsibilities',
            'Fire Pit and Outdoor Burning Rules',
            'Public Events and Noise Permits',
            'New Chat'
          ].map((topic) => (
            <li key={topic}>
              <button onClick={() => onTopicClick(topic)}>{topic}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ChatHistorySidebar;
