import React, { useState } from "react";
import './CSS/SearchBylawsPage.css'
import Header from "./components/Header.jsx";
import Sidebar from './components/Sidebar.jsx'

const SearchBylawsPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div class ="searchbylawspage">
            <Header toggleSidebar={toggleSidebar}/>
            
    
            <div class='main-content' className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}> 
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
    
              <div class = "inner">
               
              </div>
            </div>
        </div>
      );
};

export default SearchBylawsPage;
