import React, { useState } from "react";
import '../CSS/EditProfilePage.css'
import UserInformationForm from "../components/UserInformationForm.jsx";
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx'
import ChatHistorySidebar from "../components/ChatHistorySidebar.jsx";


const EditProfilePage = () => {
  const userDTO = JSON.parse(localStorage.getItem("registrationDTO")) || {
    firstName: "John",
    lastName: "doe",
    email: "johndoe@example.com",
    password: 'password', // Password is not changed in edit
  };

  const handleProfileUpdate = (formData) => {
    console.log('Updating profile:', formData);
    alert("Information updated");
    // Send `formData` data base as updated RegistrationDTO
  };

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
  
  return (
    <div class ="page">
        <Header toggleSidebar={toggleSidebar}/>

        <div className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
                {isChatHistorySidebar ? (
                <ChatHistorySidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToOldSidebar={switchToOldSidebar} />
                ) : (
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} switchToChatHistorySidebar={switchToChatHistorySidebar} />
                )}

          <div class = "inner">
            <h1 style = {styles.h1}>Hello, {userDTO.firstName}</h1>

            <UserInformationForm
            class = "form"
            title="Edit Your Profile"
            buttonText="Save Changes"
            onSubmit={handleProfileUpdate}
            initialData={userDTO} // Pre-fill with DTO data
            />
          </div>
        </div>
    </div>
  );
};

const styles = {
  h1: {
    
  }
};

export default EditProfilePage;