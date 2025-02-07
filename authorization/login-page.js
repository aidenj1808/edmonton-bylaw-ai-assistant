class UserLoginDTO {
    constructor(email, password) {
        this.email = email
        this.password = password
    }
}

function getUserLoginDTO() {
    const email_input = document.getElementById("email-text-input")
    const password_input = document.getElementById("password-password-input")
    const loginData = new UserLoginDTO(email_input, password_input)
    localStorage.setItem(loginData.email + "LoginData", JSON.stringify(loginData))
}