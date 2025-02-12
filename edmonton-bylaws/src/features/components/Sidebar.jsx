import React from "react";
import "../CSS/Sidebar.css"; // Sidebar styles

function Sidebar({ isOpen , switchToChatHistorySidebar}) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Search Bylaws</a></li>
        <li><button onClick={switchToChatHistorySidebar}>Chat History</button></li>
      </ul>
    </div>
  );
}

export default Sidebar;
