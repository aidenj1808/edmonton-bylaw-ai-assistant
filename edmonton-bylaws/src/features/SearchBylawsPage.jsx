import React, { Component, useEffect, useState } from "react";
import './CSS/SearchBylawsPage.css'
import Header from "./components/Header.jsx";
import Sidebar from './components/Sidebar.jsx'
import ChatHistorySidebar from "./components/ChatHistorySidebar.jsx";
import data from "../../data/index.json";
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, switchToChatHistorySidebar, switchToOldSidebar } from '../redux/sidebarReducer.js';

const SearchBylawsPage = () => {
    const dispatch = useDispatch();
    const {isSidebarOpen, isChatHistorySidebar} = useSelector((state) => state.sidebar);
    
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
            <Header toggleSidebar={() => dispatch(toggleSidebar())}/>
            
            <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                <ChatHistorySidebar isOpen={isSidebarOpen} toggleSidebar={() => dispatch(toggleSidebar())} switchToOldSidebar={() => dispatch(switchToOldSidebar())} />
                ) : (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => dispatch(toggleSidebar())} switchToChatHistorySidebar={() => dispatch(switchToChatHistorySidebar())} />
                )}
    
              <div className = "inner">
                <h1 className = "searchHeader">Search Bylaw Documents</h1>
                  <p className="summary-text">Explore Edmonton's bylaws with ease. Search by keywords or topics and find what you need in seconds!</p>
                <div className="search-container">
                      <input type="text" placeholder="Search Bylaws..." id="searchInputPDF" onChange={searchPDFs}/>
                      {/*<button type="button" className="button">Search</button>*/}
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