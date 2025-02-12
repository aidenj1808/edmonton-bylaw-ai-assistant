import React from "react";
import "../CSS/Sidebar.css"; // Sidebar styles

function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Search Bylaws</a></li>
        <li><a href="#">Chat History</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
