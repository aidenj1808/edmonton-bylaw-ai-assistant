export class RegistrationDTO {
    constructor(firstName, lastName, email, password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
    }
  }
  
  export class LoginDTO {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }
  }