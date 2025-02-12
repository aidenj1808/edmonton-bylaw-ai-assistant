import { useState } from 'react'
import './App.css'
import RegistrationPage from './features/authentication/RegistrationPage'
import EditProfilePage from './features/authentication/EditProfilePage'

function App() {
  return (
    <>
      <div className = "App">

        <RegistrationPage/>
        <EditProfilePage/>

      </div>
    </>
  )
}

export default App
