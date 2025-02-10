class UserSignupDTO {
    constructor(first_name, last_name, email, password) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
}

class UserLoginDTO {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

function getUserSignupDTO() {
    const firstNameInput = document.getElementById("first-name-text-input");
    const lastNameInput = document.getElementById("last-name-text-input"); // Missing ID, corrected
    const emailInput = document.getElementById("email-text-input");
    const passwordInput = document.getElementById("password-password-input");

    // Get the *values* of the input fields
    const firstName = firstNameInput ? firstNameInput.value : ""; // Handle potential nulls
    const lastName = lastNameInput ? lastNameInput.value : "";
    const email = emailInput ? emailInput.value : "";
    const password = passwordInput ? passwordInput.value : "";


    const signupData = new UserSignupDTO(firstName, lastName, email, password);

    if (email) { // Only save if email is present to avoid errors.
        localStorage.setItem(signupData.email + "SignupData", JSON.stringify(signupData));
    } else {
        console.error("Email is required for signup.");
    }
}

function getUserLoginDTO() {
    const emailInput = document.getElementById("email-text-input");
    const passwordInput = document.getElementById("password-password-input");

    const email = emailInput ? emailInput.value : "";
    const password = passwordInput ? passwordInput.value : "";

    const loginData = new UserLoginDTO(email, password);

    if (email) {
        localStorage.setItem(loginData.email + "LoginData", JSON.stringify(loginData));
    } else {
        console.error("Email is required for login.");
    }
}


// Example of how to use these functions (you would call these from your HTML, e.g., button clicks):
// const signupButton = document.getElementById("signup-button"); //Add an id to your button
// if (signupButton){
//   signupButton.addEventListener("click", getUserSignupDTO);
// }

// const loginButton = document.getElementById("login-button"); //Add an id to your button
// if (loginButton){
//   loginButton.addEventListener("click", getUserLoginDTO);
// }