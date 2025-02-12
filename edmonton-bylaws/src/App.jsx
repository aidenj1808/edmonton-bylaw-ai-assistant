import { useState } from 'react'
import './App.css'
import RegistrationPage from './features/authentication/RegistrationPage'
import EditProfilePage from './features/authentication/EditProfilePage'
import HomePage from './features/chatbot/HomePage'
import SearchBylawsPage from './features/SearchBylawsPage'

function App() {
  return (
    <>
      <div className = "App">

        <RegistrationPage/>
        <HomePage/>
        <SearchBylawsPage/>
        <EditProfilePage/>

      </div>
    </>
  )
}

export default App
