// utils/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [email, setEmail] = useState(localStorage.getItem('email') || null);

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
    console.log(email);
    localStorage.setItem('email', newEmail); // Optionally save it in localStorage
  };

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken); // Optionally save it in localStorage
  };
  
  
  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ token, email, setToken: updateToken, logout, setEmail: updateEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
