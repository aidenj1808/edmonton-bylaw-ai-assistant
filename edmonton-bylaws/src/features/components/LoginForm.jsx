import React, { useEffect, useState } from "react";
import { LoginDTO } from "../authentication/authentication-dto.js";
import { useNavigate } from "react-router-dom";
import axios from "../../mocks/axiosMock";


const LoginForm = ({onSubmit}) => {
  const [formData, setFormData] = useState(new LoginDTO("", ""));
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

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

    let userPassword = users.find(({ email, password }) => email === formData.email &&
      password === formData.password);
    if (!userPassword) {
      userPassword = null;
    } else {
      userPassword = userPassword.password
    }

    let hasEmail = false;
    if (userEmail) {
      hasEmail = formData.email === userEmail;  
    }

    let hasPassword = false;
    if (userPassword) {
      hasPassword = formData.password === userPassword;
    }

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
        onSubmit(formData);
        console.log("LoginDTO successfully sent to LoginPage:", formData);
        localStorage.setItem("loginDTO", JSON.stringify(formData));
        navigate("/home"); // Navigate to the home page
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