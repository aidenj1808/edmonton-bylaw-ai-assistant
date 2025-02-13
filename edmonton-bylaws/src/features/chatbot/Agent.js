/*Installation:
Install Ollama for OS:
https://ollama.com/download

Create Model with Modelfile:
(while in edmonton-bylaws directory)
ollama create BylawModel -f ./src/features/chatbot/Modelfile

Confirm download:
ollama list ->
    NAME                    ID              SIZE    MODIFIED
    BylawModel:latest       9c420ca36829    1.3 GB  4 seconds ago

Confirm it runs:
ollama run BylawModel
*/
import ollama from "ollama"


export class Agent {

    constructor() {

    }

    async askQuestion(prompt) {
        const response = await ollama.chat({
            model: 'BylawModel',
            messages: [{ role: 'user', content: prompt}],
        })
        return response.message.content
    }
}
