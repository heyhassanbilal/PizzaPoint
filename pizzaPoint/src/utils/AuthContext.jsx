// utils/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import {  RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase"


// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  // const auth = getAuth();
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

  const setUpRecaptcha  = (number) =>{
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {}
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number,recaptchaVerifier);
  }

  const isAuthenticated = () => {
    const token = token || localStorage.getItem('authToken');
    
    if (!token) return false;
    else {console.log(token);return true;}
  }
  
  
  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ token, email, setToken: updateToken, logout, setEmail: updateEmail, setUpRecaptcha, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
