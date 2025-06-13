import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useAuth } from "../utils/useAuth";
import { authService } from "../utils/services";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const SignUpTest = ({ setIsLoading, isLoading }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [formStep, setFormStep] = useState("form"); // "form", "otp"
  const [recaptchaRendered, setRecaptchaRendered] = useState(false); // Track if reCAPTCHA is rendered
  
  const { setToken, setEmail, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isValid, setValid] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Cleanup function to properly clear reCAPTCHA
  const cleanupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.log("Error clearing reCAPTCHA:", e);
      }
      window.recaptchaVerifier = null;
    }
    
    const container = document.getElementById("recaptcha-container");
    if (container) {
      container.innerHTML = "";
    }
    
    setRecaptchaRendered(false);
  };

  // useEffect to automatically reset when phone number changes
  useEffect(() => {
    if (phoneNumber && formStep === "form") {
      cleanupRecaptcha();
      setError(null);
      setMessage("");
    }
  }, [phoneNumber, formStep]);

  useEffect(() => {
    return () => {
      cleanupRecaptcha();
    };
  }, []);

  const setupRecaptcha = () => {
    return new Promise((resolve, reject) => {
      // If reCAPTCHA is already rendered, resolve immediately
      if (recaptchaRendered && window.recaptchaVerifier) {
        resolve(window.recaptchaVerifier);
        return;
      }

      // Clean up any existing reCAPTCHA first
      cleanupRecaptcha();

      // Make sure container exists
      const container = document.getElementById("recaptcha-container");
      if (!container) {
        reject(new Error("reCAPTCHA container not found"));
        return;
      }

      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: () => {
              console.log("reCAPTCHA solved");
            },
            "expired-callback": () => {
              console.log("reCAPTCHA expired");
              setError("reCAPTCHA expired. Please try again.");
              setIsLoading(false);
              cleanupRecaptcha();
            },
            "error-callback": (error) => {
              console.log("reCAPTCHA error:", error);
              setError("reCAPTCHA error. Please try again.");
              setIsLoading(false);
              cleanupRecaptcha();
            },
          }
        );
        
        setRecaptchaRendered(true);
        resolve(window.recaptchaVerifier);
      } catch (error) {
        console.error("Error creating reCAPTCHA:", error);
        reject(error);
      }
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const { password, confirmPassword, email } = formData;

    // Non-async validations first
    const synchronousValidations = [
      {
        condition: password !== confirmPassword,
        message: "Passwords do not match",
      },
      {
        condition: password.length < 10,
        message: "Password must be at least 10 characters",
      },
      {
        condition: !/[A-Z]/.test(password),
        message: "Password must contain at least one uppercase letter",
      },
      {
        condition: !/[0-9]/.test(password),
        message: "Password must contain at least one number",
      },
      {
        condition: !/[!@#$%^&*(),.?\":{}|<>]/.test(password),
        message: "Password must contain at least one special character",
      },
      {
        condition: !phoneNumber,
        message: "Phone number is required",
      },
    ];

    // Check all synchronous validations first
    for (let v of synchronousValidations) {
      if (v.condition) {
        setError(v.message);
        setIsLoading(false);
        return;
      }
    }

    // Check if email exists (async operation)
    try {
      const emailAlreadyExists = await authService.emailExists(email);
      if (emailAlreadyExists.exists) {
        setError("Email already exists");
        setIsLoading(false);
        console.log("Email already exists");
        return;
      } else {
        setValid(true);
        sendOtp();
      }
    } catch (err) {
      console.error("Error checking if email exists:", err);
      setError("Error checking email availability. Please try again.");
      setIsLoading(false);
      return;
    }
  };

  const sendOtp = async () => {
    try {
      setError("");
      setMessage("");

      // Setup reCAPTCHA with promise-based approach
      const appVerifier = await setupRecaptcha();
      
      // Wait a bit more for reCAPTCHA to be fully ready
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const formattedPhoneNumber = phoneNumber.startsWith("+")
        ? phoneNumber
        : "+" + phoneNumber.replace(/\D/g, "");

      console.log("Sending OTP to:", formattedPhoneNumber);

      // Create a timeout promise that rejects after 30 seconds
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Request timed out. Please try again or check if reCAPTCHA was completed."));
        }, 30000);
      });

      // Race between the actual Firebase call and timeout
      const confirmationResult = await Promise.race([
        signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier),
        timeoutPromise
      ]);

      setConfirmationResult(confirmationResult);
      setVerificationId(confirmationResult.verificationId);
      setMessage("OTP sent successfully");
      setFormStep("otp");
      setIsLoading(false);
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Error sending OTP: " + err.message);
      setIsLoading(false);
      
      // Clean up on error
      cleanupRecaptcha();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!verificationCode) {
      setIsLoading(false);
      return setError("Please enter the OTP");
    }

    try {
      const userCredential = await confirmationResult.confirm(verificationCode);
      console.log("Phone verified:", userCredential);

      const response = await authService.signup(formData);
      setEmail(response.email);
      setToken(response.token);
      setIsAuthenticated(true);
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      console.error("Error confirming OTP:", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Function to go back to form (useful for retry scenarios)
  const goBackToForm = () => {
    setFormStep("form");
    setVerificationCode("");
    setConfirmationResult(null);
    setVerificationId(null);
    setError(null);
    setMessage("");
    cleanupRecaptcha();
  };

  return (
    <div className="flex justify-center items-center min-h-[93.5vh] bg-[#ef4444]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-black text-center mb-4">
          Sign Up
        </h2>

        {formStep === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <PhoneInput
              name="phone"
              defaultCountry="HU"
              placeholder="Phone"
              value={phoneNumber}
              onChange={(value) => {
                setPhoneNumber(value);
                setFormData({ ...formData, phone: value });
              }}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
            <div id="recaptcha-container" className="mb-2"></div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
          </form>
        ) : (
          <div>
            <form onSubmit={handleVerifyOTP}>
              <p className="mb-4 text-sm text-gray-600">
                Enter the verification code sent to {phoneNumber}
              </p>
              <input
                type="text"
                name="otp"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Verification Code"
                className="w-full p-2 border rounded mb-4"
                maxLength="6"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50 mb-2"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                type="button"
                onClick={goBackToForm}
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
              >
                Change Phone Number
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </div>
        )}

        <p className="mt-3">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpTest;