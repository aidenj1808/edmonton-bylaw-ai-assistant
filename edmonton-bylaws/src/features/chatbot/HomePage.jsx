import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import '../CSS/HomePage.css'
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx'
import ChatHistorySidebar from '../components/ChatHistorySidebar.jsx'
import ChatInput from "../components/ChatInput.jsx";
import { useUser } from "../../UserProvider.jsx";
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, switchToChatHistorySidebar, switchToOldSidebar } from '../../redux/sidebarReducer.js';


const HomePage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const {isSidebarOpen, isChatHistorySidebar} = useSelector((state) => state.sidebar);
    const [selectedConversation, setSelectedConversation] = useState([]);
    const [selectedConversationData, setSelectedConversationData] = useState(location.state.data || {});
    const { user, setUser } = useUser();


    // Extract the passed state (buttons or dataStored)
    useEffect(() => {
      if (location.state?.selected) {
        setSelectedConversation(location.state.selected);
        console.log("Selected Conversation: " +selectedConversation)
      }
      if (location.state?.data){
        setSelectedConversationData(location.state.data);
        console.log("Conversation Data: "+ JSON.stringify(selectedConversationData));
      }
    }, [location.state?.selected]);

    useEffect(()=>{
      console.log("HOME Conversation Data: " + JSON.stringify(selectedConversationData));
    },[selectedConversationData])

    const [userID] = useState(user._id);

    return (
        <div class ="homepage">
            <Header toggleSidebar={() => dispatch(toggleSidebar())}/>
            
            <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                <ChatHistorySidebar 
                  isOpen={isSidebarOpen} 
                  toggleSidebar={() => dispatch(toggleSidebar())}
                  switchToOldSidebar={() => dispatch(switchToOldSidebar())}
                  setSelectedConversation={setSelectedConversation}
                  setSelectedConversationData={setSelectedConversationData}
                  />
                ) : (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => dispatch(toggleSidebar())} switchToChatHistorySidebar={() => dispatch(switchToChatHistorySidebar())} />
                )}

    
              <div class = "inner">
                <div class = "chatDiv">
                  <ChatInput
                    userID = {userID}
                    conversation = {selectedConversation}
                    passedConversationData = {selectedConversationData}
                  />
                  </div>
              </div>
            </div>
        </div>
      );
};

export default HomePage;
