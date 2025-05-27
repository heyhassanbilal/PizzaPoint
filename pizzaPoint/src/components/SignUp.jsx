import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { authService } from "../utils/services";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const SignUp = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [formStep, setFormStep] = useState("form"); // "form", "otp"
  const { setToken, setEmail, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const initializeRecaptcha = async () => {
      try {
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
        }

        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "normal",
            callback: () => {
              console.log("reCAPTCHA solved");
            },
            "expired-callback": () => {
              setError("reCAPTCHA expired. Please try again.");
            },
          },
          auth
        );

        await window.recaptchaVerifier.render();
      } catch (error) {
        console.error("reCAPTCHA initialization error:", error);
        setError("Error initializing reCAPTCHA. Please refresh the page.");
      }
    };

    initializeRecaptcha();

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { password, confirmPassword, email } = formData;

    // Validation checks
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    if (password.length < 10) {
      return setError("Password must be at least 10 characters");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain at least one uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
      return setError("Password must contain at least one number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return setError("Password must contain at least one special character");
    }
    if (!phoneNumber) {
      return setError("Phone number is required");
    }

    try {
      // Check if email exists
      const emailAlreadyExists = await authService.emailExists(email);
      if (emailAlreadyExists.exists) {
        return setError("Email already exists");
      }

      // Format phone number for Firebase
      const formattedPhone = phoneNumber.startsWith('+') 
        ? phoneNumber 
        : `+${phoneNumber.replace(/\D/g, '')}`;

      // Send verification code
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );
      
      setConfirmationResult(confirmation);
      setFormStep("otp");
    } catch (err) {
      console.error("Phone verification error:", err);
      setError(err.message || "Failed to send verification code");
      
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier.render();
      }
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(null);

    if (!verificationCode) {
      return setError("Please enter the OTP");
    }

    try {
      const userCredential = await confirmationResult.confirm(verificationCode);
      console.log("Phone verified:", userCredential);

      const response = await authService.signup(formData);
      setToken(response.token);
      setEmail(response.email);
      navigate("/");
    } catch (err) {
      console.error("Error confirming OTP:", err);
      setError(err.message || "Invalid verification code");
    }
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
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Send Verification Code
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <input
              type="text"
              name="otp"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Verification Code"
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Verify OTP
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        )}

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;