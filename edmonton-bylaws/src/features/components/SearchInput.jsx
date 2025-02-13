import React, { useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2"; //https://react-icons.github.io/react-icons/search/#q=magnify


const SearchInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [buttonVisible, setButtonVisible] = useState(false);
    
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setButtonVisible(newValue.trim() !== '');
    };

    return (
            <div styles={styles.div}>
                <input id = "searchInput"value = {inputValue} onChange={handleInputChange} 
                style = {styles.input} placeholder = "Search Bylaws">
                </input>
                {buttonVisible && (
                    <button id = "searchButton" type = "submit" style = {styles.button}>
                        <HiMiniMagnifyingGlass style = {styles.buttonIconStyle}/>
                    </button>
                )}
            </div>
    );
};

const styles = {
    // div: {
    //     display: "flex",
    //     allignItems: "center",
    // },
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

export default SearchInput;