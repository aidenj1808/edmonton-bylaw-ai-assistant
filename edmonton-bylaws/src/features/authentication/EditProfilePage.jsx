import UserInformationForm from "../components/UserInformationForm.jsx";

const EditProfilePage = () => {
  const userDTO = {
    firstName: "John",
    lastName: "doe",
    email: "johndoe@example.com",
    password: 'password', // Password is not needed for edit
  };

  const handleProfileUpdate = (formData) => {
    console.log('Updating profile:', formData);
    alert("Information updated");
    // Send `formData` data base as updated RegistrationDTO
  };

  return (
    <UserInformationForm
      title="Edit Your Profile"
      buttonText="Save Changes"
      onSubmit={handleProfileUpdate}
      initialData={userDTO} // Pre-fill with DTO data
    />
  );
};

export default EditProfilePage;