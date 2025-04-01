import React, { useState, useEffect } from "react";
import '../CSS/EditProfilePage.css'
import UserInformationForm from "../components/UserInformationForm.jsx";
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx'
import ChatHistorySidebar from "../components/ChatHistorySidebar.jsx";
import { useUser } from "../../UserProvider.jsx";
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, switchToChatHistorySidebar, switchToOldSidebar } from '../../redux/sidebarReducer.js';

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const {isSidebarOpen, isChatHistorySidebar} = useSelector((state) => state.sidebar);
  const { user, setUser } = useUser();
  const [userDTO, setUserData] = useState(user);

  useEffect(() => {
    if (user) {
      // allows chatDTO to change (updates "hello, " header)
      setUserData(user);
    }
  }, [user]);

  const handleProfileUpdate = (formData) => {
    setUser(formData);
    setUserData(user);
    alert("Profile Updated!");
  };
  
  return (
    <div class ="page">
        <Header toggleSidebar={() => dispatch(toggleSidebar())}/>

        <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                <ChatHistorySidebar isOpen={isSidebarOpen} toggleSidebar={() => dispatch(toggleSidebar())} switchToOldSidebar={() => dispatch(switchToOldSidebar())} />
                ) : (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => dispatch(toggleSidebar())} switchToChatHistorySidebar={() => dispatch(switchToChatHistorySidebar())} />
                )}

          <div class = "inner edit">
            <h1 style = {styles.h1}>Hello,  {userDTO.firstName}</h1>

            <UserInformationForm
            class = "form"
            title="Edit Your Profile"
            buttonText="Save Changes"
            onSubmit={handleProfileUpdate}
            initialData={userDTO} 
            />
          </div>
        </div>
    </div>
  );
};

const styles = {
  h1: {
    margin: "2rem auto"
  }
};

export default EditProfilePage;