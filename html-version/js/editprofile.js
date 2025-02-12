class UpdatedUserInfoDTO{
    constructor(firstname, lastname, email, password){
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
    }
}

function getUpdatedInfo(){
    const firstname = document.getElementById('firstNameInput')
    const lastname = document.getElementById('lastNameInput')
    const email = document.getElementById('emailInput')
    const password = ''// Retrieved from DB
    const updatedData = new UpdatedUserInfoDTO(firstname,lastname,email,password)
    localStorage.setItem(signupData.email + "UpdatedData", JSON.stringify(UpdatedUserInfoDTO))
}

function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("open");
}
