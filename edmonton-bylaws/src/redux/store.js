import { configureStore } from "@reduxjs/toolkit";
import chatHistoryReducer from './chatHistoryReduer.js';
import sidebarReducer from './sidebarReducer.js';
import authReducer from './authReducer.js';

const store = configureStore({
    reducer: {
      chatHistory: chatHistoryReducer, 
      sidebar: sidebarReducer,
      user: authReducer,
    },
    devTools: import.meta.env.MODE !== "production",
  });
  
  export default store;