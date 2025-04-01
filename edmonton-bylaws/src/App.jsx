import { useState } from 'react'
import './App.css'
import RegistrationPage from './features/authentication/RegistrationPage'
import EditProfilePage from './features/authentication/EditProfilePage'
import HomePage from './features/chatbot/HomePage'
import SearchBylawsPage from './features/SearchBylawsPage'
import LoginPage from './features/authentication/LoginPage'
import ChatHistory from './features/chatbot/ChatHistoryPage'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./redux/store.js"


function App() {
  return (
    <>
      <Provider store={store}>
        <div className = "App">
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/register" element={<RegistrationPage/>}/>
              <Route path="/edit-profile" element={<EditProfilePage/>}/>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/search-bylaws" element={<SearchBylawsPage/>}/>
              <Route path="/chat-history" element={<ChatHistory/>}/>
            </Routes>
          </Router>
        </div>
      </Provider>
    </>
  )
}

export default App