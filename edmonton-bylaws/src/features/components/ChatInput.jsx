import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa"; //https://react-icons.github.io/react-icons/search/#q=up%20arrow


const ChatInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [buttonVisible, setButtonVisible] = useState(false);

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setButtonVisible(newValue.trim() !== '');
      };

    return (
            <div styles={styles.div}>
                <input id = "chatInput"value = {inputValue} onChange={handleInputChange} 
                style = {styles.input} placeholder = "Ask Edmonton Bylaws anything...">
                </input>
                {buttonVisible && (
                    <button id = "chatButton" type = "submit" style = {styles.button}>
                        <FaArrowUp style = {styles.buttonIconStyle}/>
                    </button>
                )}
            </div>
    );
};

const styles = {
    input: {
        width: "500px", // Choose width needed for your screen
        margin: "10px",
        padding: "17px",
        boxSizing: "border-box",
        borderRadius: "20px",
    },
    button: {
        position: "relative",
        top: "20px",
        backgroundColor: "white",
        fontSize: "0px",
    },
    buttonIconStyle: {
        fill: "black",
        fontSize: "50px",
        backgroundColor: "#005087",
        borderRadius: "14%"
    },
};

export default ChatInput;