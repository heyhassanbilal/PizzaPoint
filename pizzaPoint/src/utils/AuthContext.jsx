// utils/AuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { authService } from "./services";
// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  // const auth = getAuth();
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [email, setEmail] = useState(localStorage.getItem("email") || null);

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
    console.log(email);
    localStorage.setItem("email", newEmail); // Optionally save it in localStorage
  };

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken); // Optionally save it in localStorage
  };

  const setUpRecaptcha = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {}
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  };

  const isAuthenticated = async () => {
  if (!token || !email) {
    console.warn("Missing token or email");
    return false;
  }

  try {
    const response = await authService.validateToken(token, email);
    console.log("Validation response:", response); // ✅ Add this

    if (response.status !== "valid") {
      console.warn("Token invalid, logging out.");
      logout();
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error validating token:", err);
    logout();
    return false;
  }
};


  const logout = () => {
    console.log("Logging out..."); // ✅ Add this
    setToken(null);
    setEmail(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        email,
        setToken: updateToken,
        logout,
        setEmail: updateEmail,
        setUpRecaptcha,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
