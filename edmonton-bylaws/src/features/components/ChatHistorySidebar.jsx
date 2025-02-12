import React from "react";
import "../CSS/Sidebar.css"; // Sidebar styles

function ChatHistorySidebar({ isOpen , switchToOldSidebar}) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><button onClick={switchToOldSidebar}>← Back</button></li>
      </ul>
    </div>
  );
}

export default ChatHistorySidebar;