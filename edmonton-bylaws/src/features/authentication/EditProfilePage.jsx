import React, { useState, useEffect } from "react";
import '../CSS/EditProfilePage.css'
import UserInformationForm from "../components/UserInformationForm.jsx";
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx'
import ChatHistorySidebar from "../components/ChatHistorySidebar.jsx";
import { useUser } from "../../userProvider.jsx";

const EditProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatHistorySidebar, setIsChatHistorySidebar] = useState(false);
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

          <div class = "inner edit">
            <h1 style = {styles.h1}>Hello, {userDTO.firstName}</h1>

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