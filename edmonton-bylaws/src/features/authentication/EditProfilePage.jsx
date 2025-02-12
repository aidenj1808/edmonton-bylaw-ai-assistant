import React, { useState } from "react";
import '../CSS/EditProfilePage.css'
import UserInformationForm from "../components/UserInformationForm.jsx";
import Header from "../components/Header.jsx";
import Sidebar from '../components/Sidebar.jsx'

const EditProfilePage = () => {
  const userDTO = {
    firstName: "John",
    lastName: "doe",
    email: "johndoe@example.com",
    password: 'password', // Password is not needed for edit
  };

  const handleProfileUpdate = (formData) => {
    console.log('Updating profile:', formData);
    alert("Information updated");
    // Send `formData` data base as updated RegistrationDTO
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div class ="page">
        <Header toggleSidebar={toggleSidebar}/>
        

        <div class='main-content' className={`main-content ${isSidebarOpen ? '' : 'sidebar-closed'}`}> 
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>

          <div class = "inner">
            <h1>Hello, {userDTO.firstName}</h1>

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

export default EditProfilePage;