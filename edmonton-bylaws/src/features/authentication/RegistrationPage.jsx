import React, { useState }from "react";
import UserInformationForm from "../components/UserInformationForm.jsx";
import { RegistrationDTO } from "../authentication/authentication-dto.js";
import { Link } from 'react-router-dom'


const RegistrationPage = () => {
  const handleRegistration = (formData) => {
    console.log('Registering user:');
    const registrationDTO = new RegistrationDTO(formData.firstName, formData.lastName,
                                                formData.email, formData.password)
    console.log(registrationDTO)
    alert("Registration Complete");
    // Send `formData` to database as RegistrationDTO
  };

  return (
    <div class ="page" style ={styles.page}>
      <h1 style = {styles.h1}>Edmonton Bylaws</h1>

      <UserInformationForm
        title="Register"
        buttonText="Register"
        onSubmit={handleRegistration}
        // Empty Registration DTO
        initialData={{ firstName: '', lastName: '', email: '', password: '' }}
      />
      <p style={styles.p}>Already have an account? <Link to="/">Log In</Link></p>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    marginLeft: "auto",
    flexDirection: "column",      
    justifyContent: "center",   
    alignItems: "center", 
    width: "100vw", 
  },
  h1: {
    background: "none",
    color: "#005087",
    fontSize: "64px",
  },
};

export default RegistrationPage;