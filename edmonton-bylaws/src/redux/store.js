import { configureStore } from "@reduxjs/toolkit";
import chatHistoryReducer from './chatHistoryReduer.js'
import sidebarReducer from './sidebarReducer.js'

const store = configureStore({
    reducer: {
      chatHistory: chatHistoryReducer, 
      sidebar: sidebarReducer,
    },
    devTools: import.meta.env.MODE !== "production",
  });
  
  export default store;