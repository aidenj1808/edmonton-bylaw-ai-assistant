import React, { useEffect, useState, useContext } from "react";
import axios from "../../mocks/axiosMock";
import "../CSS/Sidebar.css"; // Sidebar styles
import { Link, useLocation, useNavigate} from 'react-router-dom';

function ChatHistorySidebar({ isOpen, switchToOldSidebar, setSelectedConversation }) {
  const [buttons, setButtons] = useState([]);
  const [dataStored, setDataStored] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(useLocation());
  const navigate = useNavigate();

  const saveToLocalStorage = (newItem) => {
    const existingData = JSON.parse(localStorage.getItem("chatDTOs")) || [];
    existingData.push(newItem);
    localStorage.setItem("chatDTOs", JSON.stringify(existingData));
  };

  const clearChat = () => {
    localStorage.removeItem("chatDTOs");
    setDataStored([]);  // Clear chat data from state
    setButtons([]);      // Clear buttons from state
  };
  
  useEffect(() => {
    axios
      .get("/api/chathistorydata")
      .then((response) => {
        const fetchedData = response.data;
        let existingData = JSON.parse(localStorage.getItem("chatDTOs")) || [];
        existingData = existingData.filter(item => item !== null);
        const combinedData = existingData.concat(fetchedData);
        const groupedData = groupByDateAndSequence(combinedData);
        setDataStored(groupedData); 
        setButtons(groupedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        setLoading(false);
      });
  }, []);

  const groupByDateAndSequence = (chatDTOs) => {
    chatDTOs.sort((a, b) => new Date(b.date) - new Date(a.date));
    const groupedData = [];
    let currentGroup = null;

    chatDTOs.forEach((item) => {
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
  };

  const flattenGroupAtIndex = (groupedData, index) => {
    if (index < 0 || index >= groupedData.length) {
      console.error("Invalid index");
      return [];
    }
    return groupedData[index].conversations.sort((a, b) => a.sequenceNumber - b.sequenceNumber);
  };

  const handleTopicClick = (index) => {
    console.log(location.pathname);
    if (location.pathname != "/home"){
      const selectedGroup = flattenGroupAtIndex(dataStored, index);
      navigate("/home", { state: {selected: selectedGroup} });
    }
    const selectedGroup = flattenGroupAtIndex(dataStored, index);
    setSelectedConversation(selectedGroup);
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
          {buttons.map((chatDTO, index, arr) => {
            const daysAgo = getDaysAgo(chatDTO.date);
            const prevDaysAgo = index > 0 ? getDaysAgo(arr[index - 1].date) : null;
            const divider = renderDivider(daysAgo, prevDaysAgo);

            return (
              <React.Fragment key={index}>
                {divider}
                <li>
                  <button
                    style={styles.button}
                    onClick={() => handleTopicClick(index)}>
                    {chatDTO.conversations[0].prompt}
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
