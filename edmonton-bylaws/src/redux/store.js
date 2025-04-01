import { configureStore } from "@reduxjs/toolkit";
import chatHistoryReducer from './chatHistoryReduer.js'

const store = configureStore({
    reducer: {
      chatHistory: chatHistoryReducer, 
    },
    devTools: import.meta.env.MODE !== "production",
  });
  
  export default store;