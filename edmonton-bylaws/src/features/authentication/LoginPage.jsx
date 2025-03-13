import React, { useState } from "react";
import LoginForm from "../components/LoginForm.jsx";
import { Link } from 'react-router-dom';
import { useUser } from "../../userProvider.jsx";


const LoginPage = () => {
  const { setUser } = useUser();

  const handleLogin = (formData) => {
    console.log('Verifying data with database:', formData);
    setUser(formData);
  };  

  return (
    <div class ="page" style ={styles.page}>
        
        <div class = "inner">
        <h1 style = {styles.h1}>Edmonton Bylaws</h1>

        <LoginForm
        class = "form"
        onSubmit={handleLogin}
        />
        <p style={styles.p}>Don't have an account? <Link to="/register">Sign Up</Link></p>
        </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    margin: "auto",
    flexDirection: "column",      
    justifyContent: "center",   
    alignItems: "center",  
    width: "100vw",
  },
  h1: {
    margin: "2rem auto",
    paddingBottom: "3rem",
    background: "none",
    color: "#005087",
    fontSize: "64px",
  },
};

export default LoginPage;