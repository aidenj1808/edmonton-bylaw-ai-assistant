import { useState } from 'react'
import './App.css'
import RegistrationPage from './features/authentication/RegistrationPage'
import EditProfilePage from './features/authentication/EditProfilePage'
import HomePage from './features/chatbot/HomePage'
import ChatHistory from './features/chatbot/chathistory'
import SearchBylawsPage from './features/SearchBylawsPage'
import LoginPage from './features/authentication/LoginPage'
import ChatInput from './features/components/ChatInput'
import SearchInput from './features/components/SearchInput'


function App() {
  return (
    <>
      <div className = "App">
        <LoginPage/>
        <RegistrationPage/>
        <HomePage/>
        <ChatHistory/>
        <SearchBylawsPage/>
        <EditProfilePage/>
        <SearchInput />
      </div>
    </>
  )
}

export default App