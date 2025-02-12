import React from "react";
import UserInformationForm from "../components/UserInformationForm.jsx";

const RegistrationPage = () => {
  const handleRegistration = (formData) => {
    console.log('Registering user:', formData);
    alert("Registration Complete");
    // Send `formData` to database as RegistrationDTO
  };

  return (
    <div>
      <UserInformationForm
        title="Register"
        buttonText="Register"
        onSubmit={handleRegistration}
        // Empty Registration DTO
        initialData={{ firstName: '', lastName: '', email: '', password: '' }}
      />
      <p style={styles.p}>Already have an account? <a>Log In</a></p>

    </div>
  );
};

const styles = {
  p: {
    marginTop: "-60px",
    marginBottom: "5vw",
  },
};

export default RegistrationPage;
