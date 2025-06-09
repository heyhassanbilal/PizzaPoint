// utils/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
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

  const isAuthenticatedFunc = async () => {
    if (!token || !email) {
      console.warn("Missing token or email");
      return false;
    }

    try {
      const response = await authService.validateToken(email);
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

  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("email");
      if (!token || !email) {
        console.warn("No token or email found, logging out.");
        setIsAuthLoading(false);
        return;
      }

      try {
        const response = await authService.validateToken(email);
        if (response.status === "valid") {
          setIsAuthenticated(true);
        } else {
          logout();
          console.log("Token invalid, logging out.");
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        // Don't logout on network errors during initialization
      } finally {
        setIsAuthLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Check token on user activity + periodic background checks
  useEffect(() => {
    let activityTimer;
    let backgroundTimer;

    const checkTokenValidity = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await authService.validateToken(email);
        if (response.status !== "valid") {
          logout();
        }
      } catch (error) {
        console.error("Token check failed:", error);
        // Don't logout on network errors
      }
    };

    // Check on user activity (mouse, keyboard, etc.)
    const handleActivity = () => {
      clearTimeout(activityTimer);
      activityTimer = setTimeout(checkTokenValidity, 1000); // Debounce
    };

    // Background check every 30 minutes
    backgroundTimer = setInterval(checkTokenValidity, 30 * 60 * 1000);

    // Activity listeners
    window.addEventListener("mousedown", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);

    return () => {
      clearTimeout(activityTimer);
      clearInterval(backgroundTimer);
      window.removeEventListener("mousedown", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [isAuthenticated]);

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
        isAuthenticatedFunc,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
