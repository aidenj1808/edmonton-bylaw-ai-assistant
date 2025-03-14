
export class ChatDTO {
  constructor(prompt, response, sequenceNumber) {
    this.prompt = prompt;       
    this.response = response;   
    this.sequenceNumber = sequenceNumber;
  }
}

/*export class ChatDTO {
  constructor(userEmail, prompt, response, sequenceNumber) {
    this.userEmail = userEmail;  
    this.prompt = prompt;       
    this.response = response;   
    const dateLong = new Date();
    this.date = dateLong.toLocaleDateString("en-US"); 
    this.sequenceNumber = sequenceNumber;
  }
}*/

export class ConversationDTO{
  constructor(userEmail) {
    this.userEmail = userEmail;
    const jsDate = new Date();
    this.date = jsDate.toISOString();
    this.summary = " ";
  }
}
  