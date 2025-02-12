import React, { useState } from "react";
import '../CSS/HomePage.css'
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx'

const HomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div class ="homepage">
            <Header toggleSidebar={toggleSidebar}/>
            
    
            <div class='main-content' className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}> 
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
    
              <div class = "inner">
               
              </div>
            </div>
        </div>
      );
};

export default HomePage;
