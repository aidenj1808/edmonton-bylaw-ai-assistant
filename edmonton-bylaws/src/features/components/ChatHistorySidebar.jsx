import React, { useEffect, useState, useRef } from "react";
import axios from "../../mocks/axiosMock";
import "../CSS/Sidebar.css"; // Sidebar styles
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useUser } from "../../UserProvider.jsx";

function ChatHistorySidebar({ isOpen, switchToOldSidebar, setSelectedConversation, setSelectedConversationData }) {
  const [buttons, setButtons] = useState([]);
  const [location, setLocation] = useState(useLocation());
  const[needsUpdate, setNeedsUpdate] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  // tracks mount (api calls arnt made on mount)
  const hasMounted = useRef(false);

  const [conversations, setConversations] = useState(() => {
    // Try to get data from localStorage on initial load
    const savedConversations = localStorage.getItem("savedConversations");
    return savedConversations ? JSON.parse(savedConversations) : [];
  });

  const clearChat = () => {
    localStorage.removeItem("chatDTOs");
    deleteChatHistory();
    setNeedsUpdate(true);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!conversations || needsUpdate == true) { 
          await getConversations(); // this updates conversations
          setNeedsUpdate(prev => prev ? false : prev);  // Only update if true
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [needsUpdate]);

  const getConversations = async () => {
    try{
      const url = "http://localhost:5002/chats/conversations/" + encodeURIComponent(user._id);
      const response = await fetch(url, {
          method: 'GET', // Specify the method
          headers: {
          'Content-Type': 'application/json', // Ensure content type is JSON
          },
      });

      if (!response.ok) {
        throw new Error('Error finding conversations');
      }

      const data = await response.json();
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date))
      setConversations(sortedData);
      localStorage.setItem("savedConversations", JSON.stringify(sortedData)); // Store in localStorage
    } catch(error){
      console.log(error);
    }
  }
const getChats = async (id) => {
  try{
    const url = "http://localhost:5002/chats/" + encodeURIComponent(id);
    const response = await fetch(url, {
        method: 'GET', // Specify the method
        headers: {
        'Content-Type': 'application/json', // Ensure content type is JSON
        },
    });

    if (!response.ok) {
      throw new Error('Error finding chats');
    }

    const data = await response.json();
    return data;
  } catch(error){
    console.log(error);
  }
}

const deleteChatHistory = async () => {
  console.log(user.email)
  try{
    const url = "http://localhost:5002/chats/" + encodeURIComponent(user.email);
    const response = await fetch(url, {
        method: 'DELETE', // Specify the method
        headers: {
        'Content-Type': 'application/json', // Ensure content type is JSON
        },
    });

    if (!response.ok) {
      throw new Error('Error finding conversations');
    }

    localStorage.removeItem(savedConversations); // remove from local storagge
  } catch(error){
    console.log(error);
  }
}

  /*const groupByDate = (Conversations) => {
    Conversations.sort((a, b) => new Date(b.date) - new Date(a.date));
    const groupedData = [];
    let currentGroup = null;

    Conversations.forEach((item) => {
      if (item.sequenceNumber === 1) {
        if (currentGroup) {
          groupedData.push(currentGroup);
        }
        currentGroup = {
          date: item.date,
          conversations: [item],
        };
      } else if (currentGroup) {
        currentGroup.conversations.push(item);
      }
    });

    if (currentGroup) {
      groupedData.push(currentGroup);
    }

    return groupedData;
    return
  };*/

  /*const flattenGroupAtIndex = (groupedData, index) => {
    if (index < 0 || index >= groupedData.length) {
      console.error("Invalid index");
      return [];
    }
    return groupedData[index].conversations.sort((a, b) => a.sequenceNumber - b.sequenceNumber);
  };*/

  const handleTopicClick = async (index) => {
    console.log(location.pathname);
    const chats = await getChats(conversations[index]._id);

    const chatData = {
      conversationID: conversations[index]._id,
      sequenceNumber: chats[chats.length -1].sequenceNumber + 1,
    }
    console.log(chatData);
    if (location.pathname != "/home"){ // Not on the home screen
      // get chats and send to home
      console.log("Sending Conversatin ID " + conversations[index]._id + "to the home screen");
      navigate("/home", { state: {selected: chats, data: chatData} });
      return;
    }
    // Already on the home screen
    setSelectedConversation(chats);
    setSelectedConversationData(chatData);
  };

  const currentDate = new Date();
  const getDaysAgo = (dateString) => {
    const chatDate = new Date(dateString);
    const diffTime = currentDate - chatDate;
    return diffTime / (1000 * 60 * 60 * 24);
  };

  const hasChatsOlder7Days = buttons.some(chatDTO => getDaysAgo(chatDTO.date) >= 7 && getDaysAgo(chatDTO.date) <= 30);
  let last7DaysDividerShown = false;

  const renderDivider = (daysAgo, prevDaysAgo) => {
    if (daysAgo <= 7 && !last7DaysDividerShown) {
      last7DaysDividerShown = true;
      return <li className="divider">Last 7 days</li>;
    }
    if (daysAgo > 7 && daysAgo <= 30 && (prevDaysAgo === null || prevDaysAgo <= 7)) {
      return <li className="divider">Older than 7 days</li>;
    }
    if (daysAgo > 30 && (prevDaysAgo === null || prevDaysAgo <= 30)) {
      return <li className="divider">Older than 30 days</li>;
    }
    return null;
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><button onClick={switchToOldSidebar}>← Back</button></li>
        <li><button onClick={clearChat} className="clear-chat-button">Clear Chat</button></li>
        <div className="historyButtons">
          {conversations.map((conversation, index, arr) => {
            const daysAgo = getDaysAgo(conversation.date);
            const prevDaysAgo = index > 0 ? getDaysAgo(arr[index - 1].date) : null;
            const divider = renderDivider(daysAgo, prevDaysAgo);
            return (
              <React.Fragment key={index}>
                {divider}
                <li>
                  <button
                    style={styles.button}
                    onClick={() => handleTopicClick(index)}>
                    {conversation.summary}
                  </button>
                </li>
              </React.Fragment>
            );
          })}
        </div>
      </ul>
    </div>
  );
}

const styles = {
  button: {
    background: "none",
    color: "black",
    textAlign: "left",
    display: "block",
  },
};
export default ChatHistorySidebar;
