import React, { useState, useEffect, useContext } from "react";

// Create the UserContext
export const UserContext = React.createContext();

// Create a custom hook to access the user context
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Retrieve user from localStorage on initial load
  const savedUser = JSON.parse(localStorage.getItem('user')) || null;

  const [user, setUser] = useState(savedUser);

  // Store user data in localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};