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

  const isAuthenticated = async() => {
    if (!token) return;
          try {
            const response = await authService.validateToken(email);
            if (response.status != "valid") {
              console.warn("Token invalid, logging out.");
              console.log("-----------------------Token invalid, logging out.");
              logout(); // Call the logout function to clear context and localStorage
            }
          } catch (err) {
            console.error("Error validating token:", err);
            console.log(
              "-----------------------Token invalid due to catch block, logging out."
            );
            logout();
          }

    if (token == null) return false;
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
