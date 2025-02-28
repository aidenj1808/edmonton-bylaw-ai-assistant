//npm install axios axios-mock-adapter
import axios from "axios";
import MockAdapter from "axios-mock-adapter";


const mock = new MockAdapter(axios, {delayResponse: 500});

const ChatHistoryData = [
    {
        userEmail: "user@example.com",
        prompt: "Example Conversation 1",
        response: "This is example conversation one",
        date: "2/21/2025",
        sequenceNumber: 1, 
    },
    {
        userEmail: "user@example.com",
        prompt: "Example Conversation 3",
        response: "This is example conversation three",
        date: "1/21/2025",
        sequenceNumber: 1, 
    },
    {
        userEmail: "user@example.com",
        prompt: "Tell me about signage bylaws",
        response: "Edmonton has a unique relationship with certain types of signage, as outlined in the city's bylaws. According to Section 247(2) of the Edmonton Municipal Code, specific signs are prohibited from being erected on municipal properties without a permit. This means that if you were to attempt to place a large or unusual sign on a street or property within Edmonton, you would need to obtain the necessary approval before installation. The city has strict guidelines and regulations surrounding signage to ensure it does not create safety hazards, obstruct pedestrian paths, or disrupt local aesthetics. For example, signs are only permitted if they meet specific size and material requirements, and cannot be placed in a way that creates glare, obstructs views, or interferes with the use of public property. The city also reserves the right to deny any sign that it deems to be overly commercialized or detrimental to the overall character of the area. It's worth noting that while the city has specific guidelines and regulations surrounding signage, many community groups and businesses have successfully obtained permits for signs as part of their marketing efforts or property displays.",
        date: "1/21/2025",
        sequenceNumber: 2, 
    },
    {
        userEmail: "user@example.com",
        prompt: "What about parking bans",
        response: "In Edmonton, there have been instances of parking bans in certain areas. As of my knowledge cutoff date (please note that this information might be outdated), the City of Edmonton implemented various parking restrictions and enforcement measures. One notable example is the temporary ban on parking in the area around major transportation hubs, such as the Edmonton International Airport, the Southgate Mall, and other high-traffic zones, during peak hours. These bans were put into place to reduce congestion, improve air quality, and support public transit. Additionally, some streets have been designated for limited or restricted parking, which may include overnight or restricted periods. These designations can vary depending on the specific street and location. However, please note that parking regulations can change over time, so it's essential to check with the City of Edmonton's website or contact their customer service center for the most up-to-date information on current and potential parking restrictions in your area.",
        date: "1/21/2025",
        sequenceNumber: 3, 
    },
    {
        userEmail: "user@example.com",
        prompt: "Example Conversation 2",
        response: "This is example conversation two",
        date: "2/10/2025",
        sequenceNumber: 1, 
    }
]

const userData = [
    {email: "user1@example.com", password: "password1"},
    {email: "user2@example.com", password: "password2"},
    {email: "user3@example.com", password: "password3"},
]

mock.onGet("/api/chathistorydata").reply(200, ChatHistoryData);
mock.onGet("/api/userdata").reply(200, userData);

export default axios;