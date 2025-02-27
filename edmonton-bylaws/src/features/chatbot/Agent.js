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

import ollama from "ollama";

export class Agent {
    constructor() {}

    async askQuestion(prompt, model = 'BylawModel', stream = false) {
        console.time("Response Time"); // Start time measurement

        const message = { role: 'user', content: prompt };

        if (stream) {
            const response = await ollama.chat({ model, messages: [message], stream: true });

            process.stdout.write("\nGenerating response: \n");
            let fullResponse = '';
            for await (const part of response) {
                for (const char of part.message.content) {
                    process.stdout.write(char);
                    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate typing effect
                }
                fullResponse += part.message.content;
            }

            console.timeEnd("Response Time"); // End time measurement
            return fullResponse;
        } else {
            const response = await ollama.chat({ model, messages: [message] });

            console.timeEnd("Response Time"); // End time measurement
            return response.message.content;
        }
    }
}
