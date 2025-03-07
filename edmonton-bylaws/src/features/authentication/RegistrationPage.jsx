import React, { useState } from "react";
import UserInformationForm from "../components/UserInformationForm.jsx";
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
  const [error, setError] = useState(null);

  const handleRegistration = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert("Registration Complete");
      console.log("User registered:", data.user);
    } catch (error) {
      console.error("Registration error:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="page" style={styles.page}>
      <h1 style={styles.h1}>Edmonton Bylaws</h1>

      {error && <p style={styles.error}>{error}</p>}

      <UserInformationForm
        title="Register"
        buttonText="Register"
        onSubmit={handleRegistration}
        initialData={{ firstName: "", lastName: "", email: "", password: "" }}
      />

      <p style={styles.p}>
        Already have an account? <Link to="/">Log In</Link>
      </p>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
  },
  h1: {
    color: "#005087",
    fontSize: "64px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};

export default RegistrationPage;
