export class ChatDTO {
    constructor(userEmail, prompt, response, sequenceNumber) {
      this.userEmail = userEmail;  
      this.prompt = prompt;       
      this.response = response;   
      const dateLong = new Date();
      this.date = dateLong.toLocaleDateString("en-US"); 
      this.sequenceNumber = sequenceNumber;
    }
  }
  