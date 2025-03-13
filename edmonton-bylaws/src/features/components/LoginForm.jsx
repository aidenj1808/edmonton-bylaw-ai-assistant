import React, { useEffect, useState } from "react";
import { LoginDTO } from "../authentication/authentication-dto.js";
import axios from "../../mocks/axiosMock";
import { useNavigate } from "react-router-dom";


const LoginForm = ({onSubmit}) => {
  const [formData, setFormData] = useState(new LoginDTO("", ""));
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  /*useEffect(() => {
    axios
      .get("/api/userdata")
      .then((response) => {
        const userData = response.data;
        setUsers(userData);
      })
  }, []);*/
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  const searchUser = async (userData) => {
    try{
      const url = "http://localhost:5002/dbUsers/" + encodeURIComponent(userData.email);
      const response = await fetch(url, {
        method: 'GET', // Specify the method
        headers: {
          'Content-Type': 'application/json', // Ensure content type is JSON
        },
      });
  
      // Email not found
      if (!response.ok) {
        return {email:false, password:false};
      }
  
      // User found check password
      const data = await response.json();
      if (data.password === userData.password){
        console.log('User found. Email correct.');
        onSubmit(data);
        navigate("/home", {state: data}); // Navigate to the home page
        return {email: true, password: true};
      }
      else{
        // Password was incorrect
        console.log('User found. Email incorrect.');
        return {email:true, password:false};
      }
      
    } catch (error) {
      console.error('Error finding user:', error.message);
      return {email:false, password:false};
    }
  };

  // Validate form fields
  const validateForm = async () => {
    //searchUser(formData);

    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /*let userEmail = users.find(({ email }) => email === formData.email);
    if (!userEmail) {
      userEmail = null;
    } else {
      userEmail = userEmail.email
    }

    let userPassword = users.find(({ email, password }) => email === formData.email &&
      password === formData.password);
    if (!userPassword) {
      userPassword = null;
    } else {
      userPassword = userPassword.password
    }*/

    const varification = await searchUser(formData);

    const hasEmail = varification.email;
    const hasPassword = varification.password;

    if (!hasEmail) {
      errors.email = "Email is not registered.";
    }

    if (hasEmail && !hasPassword) {
      errors.password = "Password is incorrect.";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email.";  
    }
      
    if (!formData || formData.password.length < 6) {
        errors.password = "Password should be at least 6 characters long.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
        searchUser(formData);
    }
  };  

  return (
    <div className="registration-container" style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required
            style={styles.input}
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        <div style={styles.field}>
        <label htmlFor="password" style={styles.label}>
            Password:
        </label>
        <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            required
            style={styles.input}
        />
        {errors.password && (
            <span style={styles.error}>{errors.password}</span>
        )}
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

// Inline styles for basic styling
const styles = {
    container: {
      maxWidth: "400px",
      minWidth: "400px",
      padding: "20px",
      border: "2px solid black",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    field: {
      marginBottom: "15px",
      textAlign: "left",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "8px",
      boxSizing: "border-box",
      border: "2px solid black",
      borderRadius: "10px"
    },
    button: {
      padding: "10px",
      backgroundColor: "#005087",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
      color: "white"
    },
    error: {
      color: "red",
      fontSize: "0.8em",
    },
  };
  
  export default LoginForm;