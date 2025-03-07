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

    async answerPrompt(prompt, model = 'BylawModel', stream = false) {
        const message = { role: 'user', content: prompt };

        if (stream) {
            const responseStream = await ollama.chat({ model, messages: [message], stream: true });

            let fullResponse = '';
            process.stdout.write("\nGenerating response: \n");

            for await (const part of responseStream) {
                fullResponse += part.message.content;
                process.stdout.write(part.message.content); // Print chunked response directly
            }

            console.timeEnd("Response Time"); // End time measurement
            return fullResponse;
        } else {
            const { message: { content } } = await ollama.chat({ model, messages: [message] });

            console.timeEnd("Response Time"); // End time measurement
            return content;
        }
        // const response = await ollama.chat({ model, messages: [message] });
        // return response.message.content;

    }
}
