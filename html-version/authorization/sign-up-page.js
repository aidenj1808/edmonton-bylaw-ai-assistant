class UserSignupDTO {
    constructor(first_name, last_name, email, password) {
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.password = password
    }
}

function getUserSignupDTO() {
    const first_name = document.getElementById("first-name-text-input")
    const last_name = document.getElementById()
    const email_input = document.getElementById("email-text-input")
    const password_input = document.getElementById("password-password-input")
    const signupData = new UserSignupDTO(first_name, last_name, email_input, password_input)
    localStorage.setItem(signupData.email + "SignupData", JSON.stringify(signupData))
}