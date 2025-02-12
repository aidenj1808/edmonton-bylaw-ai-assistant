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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
