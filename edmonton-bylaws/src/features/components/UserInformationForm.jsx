import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../mocks/axiosMock";

const UserInformationForm = ({title, buttonText, onSubmit, initialData }) => {
    // State variables to store form input values
    const [formData, setFormData] = useState({
        firstName: initialData?.firstName || '',
        lastName: initialData?.lastName || '',
        email: initialData?.email || '',
        password: initialData?.password || '',
    });

    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      axios
        .get("/api/userdata")
        .then((response) => {
          const userData = response.data;
          setUsers(userData);
        })
    }, []);

    // Handle form input change
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let userEmail = users.find(({ email }) => email === formData.email);
    if (!userEmail) {
      userEmail = null;
    } else {
      userEmail = userEmail.email
    }

    let hasEmail = false;
    if (userEmail) {
      hasEmail = formData.email === userEmail;  
    }

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
        onSubmit(formData);
        console.log("Form submitted successfully:", formData);
        localStorage.setItem("registrationDTO", JSON.stringify(formData));
        if (buttonText === "Register"){
          navigate("/home"); // Navigate to the home page
        }
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