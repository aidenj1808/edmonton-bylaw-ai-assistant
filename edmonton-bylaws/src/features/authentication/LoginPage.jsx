import React, { useState } from "react";
import LoginForm from "../components/LoginForm.jsx";

const LoginPage = () => {
//   const userDTO = {
//     firstName: "John",
//     lastName: "doe",
//     email: "johndoe@example.com",
//     password: 'password', // Password is not needed for edit
//   };

  const handleLogin = (formData) => {
    console.log('Verifying data with database:', formData);
    alert("Login Complete")
    // Verify `formData` in data base with LoginDTO
  };  

  return (
    <div class ="page" style ={styles.page}>
        
        <div class = "inner">
        <h1 style = {styles.h1}>Edmonton Bylaws</h1>

        <LoginForm
        class = "form"
        onSubmit={handleLogin}
        />
        <p style={styles.p}>Don't have an account? <a href="#">Sign Up</a></p>
        </div>
    </div>
  );
};

const styles = {
    page: {
      display: "flex",
      marginLeft: "9vw",
      flexDirection: "column",      
      justifyContent: "center",   
      alignItems: "center",  
    },
    h1: {
      marginLeft: "-1vw",
      marginTop: "5vw",
      paddingBottom: "60px",
      background: "none",
      color: "#005087",
      fontSize: "64px",
    },
    // p: {
    //   marginTop: "-60px",
    //   marginBottom: "5vw",
    // },
  };

export default LoginPage;