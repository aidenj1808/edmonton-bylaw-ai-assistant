import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { updateUser } from "../../redux/authReducer.js";

const UserInformationForm = ({title, buttonText, onSubmit, initialData}) => {
    const dispatch = useDispatch();
    // State variables to store form input values
    const [formData, setFormData] = useState(initialData);
    const [userData, setUserData] = useState(formData);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Handle form input change
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => {
        const updatedData = { ...prevData, [name]: value };
        return updatedData;
      });
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let userEmail = formData.email;
    if (!userEmail) {
      userEmail = null;
    } else {
      userEmail = userEmail.email
    }

    let hasEmail = false;

    if (hasEmail) errors.email = "Email is already registered.";
    if (!formData.firstName) errors.firstName = "First name is required.";
    if (!formData.lastName) errors.lastName = "Last name is required.";
    if (!emailRegex.test(formData.email))
      errors.email = "Please enter a valid email.";
    if (buttonText === "Register"){
        if (formData.password.length < 6)
        errors.password = "Password should be at least 6 characters long.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (buttonText === "Save Changes"){
        if(formData != userData){
          updateUserDB(userData);
        }
      } 
      else{
        createUser(formData);
      }
    }
  };

  const updateUserDB = async (userData) => {
    try{
      const url = "http://localhost:5002/dbUsers/" + encodeURIComponent(userData.email);
      const response = await fetch(url, {
        method: 'PUT', // Specify the method
        headers: {
          'Content-Type': 'application/json', // Ensure content type is JSON
        },
        body: JSON.stringify(formData),
      });
      const errors = {};

      if (!response.ok) {
        throw new Error('Error updating user');
      }
  
      const data = await response.json();
      setUserData(formData);
      setFormData(formData);
      onSubmit(formData);

    } catch (error) {
      errors.email = "User already exists with that email";
      setErrors(errors);
      console.error('Error updating. Email already exists:'); // Handle errors
    }
  };

  const createUser = async (userDTO) => {
    try {
      const response = await fetch("http://localhost:5002/dbUsers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDTO), // Send as JSON string
      });
  
      // Check if the response is not OK (e.g., 400, 500)
    const errors = {};
    if (!response.ok) {
      errors.email = "User already exists with that email."
      setErrors(errors);
      //alert(errors); 
    }
    else{
      const data = await response.json()
      dispatch(updateUser(data.user));
      console.log(userDTO);
      navigate("/home", {state: userDTO}); // Navigate to the home page
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
  }
  };

  return (
    <div className="registration-container" style={styles.container}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label htmlFor="firstName" style={styles.label}>
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {errors.firstName && (
            <span style={styles.error}>{errors.firstName}</span>
          )}
        </div>

        <div style={styles.field}>
          <label htmlFor="lastName" style={styles.label}>
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {errors.lastName && (
            <span style={styles.error}>{errors.lastName}</span>
          )}
        </div>

        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        {buttonText === "Register" && (
            <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.password && (
              <span style={styles.error}>{errors.password}</span>
            )}
          </div>
        )}

        <button type="submit" style={styles.button}>
          {buttonText}
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
  
  export default UserInformationForm;