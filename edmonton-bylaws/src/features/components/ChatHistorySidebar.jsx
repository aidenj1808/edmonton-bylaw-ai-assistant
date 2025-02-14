import React, { useEffect, useState } from "react";
import "../CSS/Sidebar.css"; // Sidebar styles

function ChatHistorySidebar({ isOpen , switchToOldSidebar, onConversationSelect}) {
  const [buttons, setButtons] = useState([]);

  let storedData = [];
  // Read from localStorage 
  useEffect(() => {
    storedData = JSON.parse(localStorage.getItem("chatDTOs")) || [];
    
    console.log("Sidebar Data:" + storedData);
    setButtons(storedData);
  }, []);

   // change this function to a summary later
   const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const groupByDateAndSequence = (chatDTOs) => {
    // Sort chatDTOs by date to ensure proper grouping
    chatDTOs.sort((a, b) => new Date(a.date) - new Date(b.date));
    
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

  // Handle topic click
  const handleTopicClick = (index) => {
    storedData = JSON.parse(localStorage.getItem("chatDTOs")) || [];
    console.log("STORED DATA" + storedData);
    console.log("Topic Change: " + storedData[index] || []);
    onConversationSelect(index);
  };  

  return (
    <div class = "sidebar" className={`sidebar ${isOpen ? "open" : ""}`}>
      <ul>
        <li><button onClick={switchToOldSidebar}>← Back</button></li>
        {buttons.map((chatDTO, index) => (
        // Display prompt as the button label
        <li> 
          <button 
            key={index}
            style={styles.button}
            onClick={() => handleTopicClick(index)}>
              {truncateText(chatDTO.prompt,15)}
          </button>
        </li>
      ))}
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