import { useState } from 'react'
import './App.css'
import RegistrationPage from './features/authentication/RegistrationPage'
import EditProfilePage from './features/authentication/EditProfilePage'
import HomePage from './features/chatbot/HomePage'
import SearchBylawsPage from './features/SearchBylawsPage'
import LoginForm from './features/components/LoginForm'
import LoginPage from './features/authentication/LoginPage'

function App() {
  return (
    <>
      <div className = "App">

        <RegistrationPage/>
        <LoginPage/>
        <HomePage/>
        <SearchBylawsPage/>
        <EditProfilePage/>

      </div>
    </>
  )
}

export default App
