# cmpt315-project
Before running the project, you will need the custom bylaws model running.<br><br>
Install Ollama for your operating system: [Download Ollama](https://ollama.com/download)<br>
For operating systems that are not Linux, make sure the Ollama application is running in the background<br><br>
Create model with modelfile
```sh
cd edmonton-bylaws
ollama create BylawModel -f ./src/features/chatbot/Modelfile
```
Confirm model download
```sh
ollama list
    NAME                    ID              SIZE    MODIFIED
    BylawModel:latest       9c420ca36829    1.3 GB  4 seconds ago
```
Confirm it runs and works
```sh
ollama run BylawModel:latest
>>> hello
Hello! I'm here to help with any questions you may have about Edmonton's bylaws. What would you like to know?

>>> What is your job?
I'm a knowledgeable agent who specializes in providing information about Edmonton's bylaws, regulations, and policies. My primary 
goal is to help users understand and navigate the city's rules and guidelines that govern various aspects of life in Edmonton.

As a bylaw expert, I can provide answers to questions about:

* Municipal bylaws
* Zoning bylaws
* Land use bylaws
* Noise bylaws
* Prohibition bylaws (e.g., cannabis)
* And many more!

Feel free to ask me any question you have, and I'll do my best to provide a clear and accurate response.

>>> Send a message (/? for help)
```
You will also need to install [Node.js](https://nodejs.org/en). 

Afterwards you will need to install the dependencies for the react project
Start by getting to the right directory for the react project
```sh
cd edmonton-bylaws
npm install
```
In a seperate terminal, get the database server running (Make sure it is also in the right directory)
To start the server for the database you will enter the following code in the terminal
```sh
node server.js
```

With all the dependencies installed and the necessary server and model running you can finally run the website
```sh
npm run dev
```

**Created by:**
Aiden
Brayden
Vedant
James
