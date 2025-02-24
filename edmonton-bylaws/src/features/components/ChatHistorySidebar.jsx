import React, { useEffect, useState } from "react";
import axios from "../../mocks/axiosMock";
import "../CSS/Sidebar.css"; // Sidebar styles
import { Link } from 'react-router-dom'

function ChatHistorySidebar({ isOpen , switchToOldSidebar, setSelectedConversation}) {
  const [buttons, setButtons] = useState([]);
  const [dataStored, setDataStored] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function saveToLocalStorage(newItem) {
    // Retrieve existing data or initialize an empty array
    const existingData = JSON.parse(localStorage.getItem("chatDTOs")) || [];
    console.log(existingData);

    // Append new data
    existingData.push(newItem);

    // Save updated array back to local storage
    localStorage.setItem("chatDTOs", JSON.stringify(existingData));

    console.log(existingData);
  };

  let storedData = [];
  
  // Read from localStorage 
  useEffect(() => {
    axios
      .get("/api/chathistorydata")
      .then((response) => {
        storedData = response.data;

        const existingData = JSON.parse(localStorage.getItem("chatDTOs")) || [];
        if (existingData != []){
          storedData = existingData.concat(storedData);
        }
      
        const processedData = groupByDateAndSequence(storedData);

        setDataStored(processedData)
        setButtons(processedData);
      })
      .catch((err) => {
        setError(err.toString());
        setLoading(false);
      })
  }, []);

   /* change this function to a summary later
   const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;*/
  //};

  const groupByDateAndSequence = (chatDTOs) => {
    // Sort chatDTOs by date to ensure proper grouping
    chatDTOs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Initialize an array to hold the sub-arrays grouped by date and sequence
    const groupedData = [];
    let currentGroup = null;
  
    // Iterate through the chatDTOs array
    chatDTOs.forEach((item) => {
      // Check if the sequence number is 1 and if it's a new day or start of a new group
      if (item.sequenceNumber === 1) {
        // If currentGroup exists and is not empty, push the group to groupedData
        if (currentGroup) {
          groupedData.push(currentGroup);
        }
        
        // Start a new group for this date
        currentGroup = {
          date: item.date, // The date for the new group
          conversations: [item] // Start with the current item
        };
      } else if (currentGroup) {
        // Otherwise, just push the current item into the existing group
        currentGroup.conversations.push(item);
      }
    });
  
    // Push the last group into the result array if any
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

    // Get the group at the specified index
    const selectedGroup = groupedData[index];

    // Return the conversations in that group sorted by sequence number
    return selectedGroup.conversations.sort((a, b) => a.sequenceNumber - b.sequenceNumber);
  };


  // Handle topic click
  const handleTopicClick = (index) => {
    //storedData = JSON.parse(localStorage.getItem("chatDTOs")) || [];
    //storedData = groupByDateAndSequence(storedData);
    storedData = flattenGroupAtIndex(dataStored,index)
    setSelectedConversation(storedData);
  };

  const currentDate = new Date(); // Today's date
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7); // 7 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);

  const getDaysAgo = (dateString) => {
    const chatDate = new Date(dateString);
    const diffTime = currentDate - chatDate;
    return diffTime / (1000 * 60 * 60 * 24); 
  };

  // Check to display dividers 
  const hasChatsOlder7Days = buttons.some(chatDTO => getDaysAgo(chatDTO.date) >= 7 && getDaysAgo(chatDTO.date) <= 30);
  let last7DaysDividerShown = false;

  return (
    <div class = "sidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><button onClick={switchToOldSidebar}>← Back</button></li>
          <div class="historyButtons">
            {buttons.map((chatDTO, index, arr) => {
                const daysAgo = getDaysAgo(chatDTO.date);
                const prevDaysAgo = index > 0 ? getDaysAgo(arr[index - 1].date) : null;
                const showOlder7DayDivider = hasChatsOlder7Days && daysAgo > 7 && (prevDaysAgo === null || prevDaysAgo <= 7);
                const show30DayDivider = daysAgo > 30 && (prevDaysAgo === null || prevDaysAgo <= 30);
                
                const showLast7DaysDivider = !last7DaysDividerShown && daysAgo <= 7;
                if (showLast7DaysDivider) last7DaysDividerShown = true;

                return(
                  <React.Fragment key={index}>
                    {showLast7DaysDivider && <li class="divider">Last 7 days</li>}
                    {showOlder7DayDivider && <li class="divider">Older than 7 days</li>}
                    {show30DayDivider && <li class="divider">Older than 30 days</li>}
                    <li> 
                      <button 
                        key={index}
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
    alignText: "left",
    display: "block", 
  },
};

export default ChatHistorySidebar;