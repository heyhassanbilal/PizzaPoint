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

     const checkToken = async () => {
          // const token = localStorage.getItem("authToken");
          if (!token) return;
    
          try {
            const text = await authService.validateToken();
            // const text = await res.text();
    
            if (text.toLowerCase().includes("invalid")) {
              console.warn("Token invalid, logging out.");
              // localStorage.removeItem("authToken");
              setToken(null); // Clear the token in context
              // if (window.location.pathname !== "/login") {
              //   // navigate("/login");
              //   window.location.href = "/login";
              // }
            }
          } catch (err) {
            console.error("Error validating token:", err);
            // localStorage.removeItem("authToken");
            setToken(null); // Clear the token in context
            // if (window.location.pathname !== "/login") {
            //   window.location.href = "/login";
            //   // navigate("/login");
            // }
          }
        };
    
    checkToken();

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
