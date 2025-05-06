import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { authService } from "../utils/services";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
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
  }, []);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container", // <-- string
        {
          size: "normal",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            setError("reCAPTCHA expired. Refresh and try again.");
          },
        },
        auth // <-- pass auth here
      );
      window.recaptchaVerifier.render();
    }
  }, []);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    if (formData.password.length < 10) {
      return setError("Password must be at least 10 characters");
    }
    if (!phoneNumber) {
      return setError("Phone number is required");
    }

    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setFormStep("otp");
    } catch (err) {
      setError(err.message);
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
      alert("User registered successfully");
      navigate("/");
    } catch (err) {
      setError(err.message);
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
            <div id="recaptcha-container" />
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

export default SignUp;
