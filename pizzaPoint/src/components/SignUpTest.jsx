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

  // useEffect to automatically reset when phone number changes
  useEffect(() => {
    if (phoneNumber && formStep === "form") {
      // Clear any existing reCAPTCHA when phone number changes
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.log("Error clearing reCAPTCHA on phone change:", e);
        }
        window.recaptchaVerifier = null;
      }

      const container = document.getElementById("recaptcha-container");
      if (container) {
        container.innerHTML = "";
      }

      // Clear any previous errors
      setError(null);
      setMessage("");
    }
  }, [phoneNumber, formStep]);

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.log("Error clearing reCAPTCHA on unmount:", e);
        }
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const setupRecaptcha = () => {
    // Always clear existing verifier first
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.log("Error clearing existing reCAPTCHA:", e);
      }
      window.recaptchaVerifier = null;
    }

    // Make sure container exists and is clean
    const container = document.getElementById("recaptcha-container");
    if (!container) {
      console.error("reCAPTCHA container not found");
      setError("reCAPTCHA container not found. Please refresh the page.");
      return;
    }

    container.innerHTML = "";

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
            setIsLoading(false); // Stop loading on expiry
          },
          "error-callback": (error) => {
            console.log("reCAPTCHA error:", error);
            setError("reCAPTCHA error. Please try again.");
            setIsLoading(false); // Stop loading on error
          },
        }
      );
    } catch (error) {
      console.error("Error creating reCAPTCHA:", error);
      setError("Failed to initialize reCAPTCHA. Please refresh the page.");
      setIsLoading(false);
    }
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
        return; // Exit early without attempting phone and email authentication
      }
    }

    // Check if email exists (async operation)
    try {
      const emailAlreadyExists = await authService.emailExists(email);
      if (emailAlreadyExists.exists) {
        setError("Email already exists");
        setIsLoading(false);
        console.log("Email already exists");
        return; // Exit early without attempting phone authentication
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
      setupRecaptcha();

      // Wait a bit for reCAPTCHA to initialize
      await new Promise((resolve) => setTimeout(resolve, 500));

      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error("reCAPTCHA not initialized properly");
      }
      //   const formattedPhoneNumber = "+" + phoneNumber.replace(/\D/g, "");
      const formattedPhoneNumber = phoneNumber.startsWith("+")
        ? phoneNumber
        : "+" + phoneNumber.replace(/\D/g, "");
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        appVerifier
      );
      setConfirmationResult(confirmationResult);
      setVerificationId(confirmationResult.verificationId);
      setMessage("OTP sent successfully");
      setFormStep("otp");
      setIsLoading(false);
    } catch (err) {
      setError("Error sending OTP: " + err.message);
      setIsLoading(false);

      // Proper cleanup on error
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (e) {
          console.log("Error clearing reCAPTCHA after failed OTP:", e);
        }
        window.recaptchaVerifier = null;
      }

      // Also clear the container
      const container = document.getElementById("recaptcha-container");
      if (container) {
        container.innerHTML = "";
      }
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
      // alert("User registered successfully");
      setIsAuthenticated(true);
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      console.error("Error confirming OTP:", err);
      setError(err.message);
      setIsLoading(false);
    }
  };
  //   return (
  //     <div style={{ margin: '20px' }}>
  //       <h2>Phone Authentication</h2>
  //       <div id="recaptcha-container"></div>
  //       <input
  //         type="text"
  //         placeholder="Enter phone number with country code (e.g., +1234567890)"
  //         value={phoneNumber}
  //         onChange={(e) => setPhoneNumber(e.target.value)}
  //         style={{ marginBottom: '5px' }}
  //       />
  //       <button onClick={sendOtp}>Send OTP</button>
  //       {message && <p style={{ color: 'green' }}>{message}</p>}
  //       {error && <p style={{ color: 'red' }}>{error}</p>}
  //     </div>
  //   );
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
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Send Verification Code
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <input
              type="text"
              name="otp"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Verification Code"
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Verify OTP
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
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
