import React, { Component, useState } from "react";
import './CSS/SearchBylawsPage.css'
import Header from "./components/Header.jsx";
import Sidebar from './components/Sidebar.jsx'
import ChatHistorySidebar from "./components/ChatHistorySidebar.jsx";
import data from "../../data/index.json";

const SearchBylawsPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isChatHistorySidebar, setIsChatHistorySidebar] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

      // Switch to the chat history sidebar
      const switchToChatHistorySidebar = () => {
        setIsChatHistorySidebar(true);  // Switch to new sidebar
    };

    // Switch back to the original sidebar
    const switchToOldSidebar = () => {
        setIsChatHistorySidebar(false); // Switch back to the original sidebar
    };
    function pdfTemplate(filename) {
      return <object className="pdf" data={filename} width="800" height="500"></object>
    }
    const pdfs = [];
    // loop through data.files.length (276), currently using lower numbers in order to not bloat the system
    for (let i = 0; i < 2; i++){
      pdfs.push(pdfTemplate("./data/"+data.files[i]))
    }
    function searchPDFs(){
      // Finds Searchbar and Pdfs and stores them
      var search = document.getElementById("searchInputPDF");
      var pdfs = document.getElementsByClassName("pdf");
      // for each item in pdfs
      for (var i = 0; i < pdfs.length; i++){
          var pdf = pdfs[i];
          // format fileName from pdf's data 
          var fileName = pdf.data.split("/")[pdf.data.split("/").length-1].split("_").join(" ");
          // compares fileName to search value and hides/shows respective pdf
          if (fileName.search(search.value) >= 1 || search.value == ""){
              pdf.style.display = "inline";
          }
          else{
              pdf.style.display = "none";
          }
      }
    }

    return (
        <div class ="searchbylawspage">
            <Header toggleSidebar={toggleSidebar}/>
            
            <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                <ChatHistorySidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToOldSidebar={switchToOldSidebar} />
                ) : (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToChatHistorySidebar={switchToChatHistorySidebar} />
                )}
    
              <div class = "inner">
                <div class="search-container">
                      <input type="text" placeholder="Search..." id="searchInputPDF" oninput={searchPDFs()}/>
                      <button type="button">Search</button>
                </div>
                <section class="pdf-container">
                    {pdfs}
                </section>

              </div>
            </div>
        </div>
      );
};

export default SearchBylawsPage;
