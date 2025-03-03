import React from "react";
import "../CSS/Sidebar.css"; // Sidebar styles
import { Link, useNavigate } from 'react-router-dom'

function Sidebar({ isOpen , switchToChatHistorySidebar}) {
  const navigate = useNavigate();

  return ( 
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><button onClick={() => navigate("/home", { state: {selected: []} })}>Home</button></li>
        <li><Link to="/search-bylaws">Search Bylaws</Link></li>
        <li><button onClick={switchToChatHistorySidebar}>Chat History</button></li>
      </ul>
      </div>
  );
}

export default Sidebar;
