import React, { Component, useEffect, useState } from "react";
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
    function pdfLinkTemplate(filename){
      var displayName = filename.split("/")[filename.split("/").length-1].split("_").join(" ");
      displayName = displayName.replace(".pdf", "")
      return <a className="pdfLink button" width="15rem" display="block" href={filename} target="_blank" >{displayName}</a>
    }
    const pdfs = [];
    // loop through data.files.length (276), currently using lower numbers in order to not bloat the system
    const pdfNum = data.files.length;
    for (let i = 0; i < pdfNum; i++){
      pdfs.push(pdfLinkTemplate("./data/"+data.files[i]))
    }
    function hidePDFs(){
      var pdfs = document.getElementsByClassName("pdfLink");
      for(var i = 0; i< pdfs.length; i++){
        var pdf = pdfs[i];
        if (i%8 == 0){
          pdf.style.display = "inline";
        }
        else{
          pdf.style.display = "none";
        }
      }
    }
    // index num for each first letter of each file
    // # 0-24
    // A 25-43
    // B 44-129
    // C 130-160
    // D 161-168
    // E 169-201
    // F 202-206
    // G 207-209
    // H 210-214
    // I 215
    // L 216-217
    // M 218-221
    // N 222-228
    // O 229-230
    // P 231-237
    // Q 238
    // R 239-247
    // S 248-261
    // T 262-263
    // U 264
    // V 265
    // W 266-271
    // Y 272
    // ? 273-275
    // on load run hidePDFs
    useEffect(() => {
      hidePDFs();
    }, []);
    function searchPDFs(){
      // Finds Searchbar and Pdfs and stores them
      var search = document.getElementById("searchInputPDF");
      // console.log("value:" + search.value);
      // for each item in pdfs
      if (search.value == ""){
        hidePDFs();
      }
      else{
        var pdfs = document.getElementsByClassName("pdfLink");
        for (var i = 0; i < pdfs.length; i++){
            var pdf = pdfs[i];
            // format fileName from pdf's data 
            var fileName = pdf.href.split("/")[pdf.href.split("/").length-1].split("_").join(" ");
            // console.log(i+":"+fileName+":"+i%9);
            // compares fileName to search value and hides/shows respective pdf
            if (fileName.toLowerCase().includes(search.value.toLowerCase())){
                pdf.style.display = "inline";
            }
            else{
                pdf.style.display = "none";
            }
        }
      }
    }
    return (
        <div className ="searchbylawspage">
            <Header toggleSidebar={toggleSidebar}/>
            
            <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                <ChatHistorySidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToOldSidebar={switchToOldSidebar} />
                ) : (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToChatHistorySidebar={switchToChatHistorySidebar} />
                )}
    
              <div className = "inner">
                <h1 className = "searchHeader">Search Bylaw PDFs</h1>
                <div className="search-container">
                      <input type="text" placeholder="Search..." id="searchInputPDF" onChange={searchPDFs}/>
                      <button type="button" className="button">Search</button>
                </div>
                <section className="pdf-container">
                    {pdfs}
                </section>

              </div>
            </div>
        </div>
      );
};

export default SearchBylawsPage;