import React from "react";
import "../CSS/Sidebar.css"; // Sidebar styles
import { Link } from 'react-router-dom'

function Sidebar({ isOpen , switchToChatHistorySidebar}) {
  return ( 
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><Link to="/home" onClick={() => history.push('/home')}>Home</Link></li>
        <li><Link to="/search-bylaws">Search Bylaws</Link></li>
        <li><button onClick={switchToChatHistorySidebar}>Chat History</button></li>
      </ul>
      </div>
  );
}

export default Sidebar;
