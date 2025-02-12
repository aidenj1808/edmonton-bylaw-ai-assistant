import UserInformationForm from "../components/UserInformationForm.jsx";

const RegistrationPage = () => {
  const handleRegistration = (formData) => {
    console.log('Registering user:', formData);
    alert("Registration Complete");
    // Send `formData` to database as RegistrationDTO
  };

  return (
    <UserInformationForm
      title="Register"
      buttonText="Register"
      onSubmit={handleRegistration}
      // Empty Registration DTO
      initialData={{ firstName: '', lastName: '', email: '', password: '' }}
    />
  );
};

export default RegistrationPage;
