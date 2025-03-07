import { useState } from 'react';
import './App.css';
import RegistrationPage from './features/authentication/RegistrationPage';
import EditProfilePage from './features/authentication/EditProfilePage';
import HomePage from './features/chatbot/HomePage';
import SearchBylawsPage from './features/SearchBylawsPage';
import LoginPage from './features/authentication/LoginPage';
import ChatInput from './features/components/ChatInput';
import SearchInput from './features/components/SearchInput';
import ChatHistory from './features/chatbot/ChatHistoryPage';
import User from './models/User';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search-bylaws" element={<SearchBylawsPage />} />
            <Route path="/chat-history" element={<ChatHistory />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
