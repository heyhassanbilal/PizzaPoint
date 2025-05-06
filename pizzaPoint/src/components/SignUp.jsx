import { React, useState, useContext, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { authService } from "../utils/services";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const SignUp = () => {
  // const auth = getAuth();
  const [verificationCode, setVerificationCode] = useState("");
  const [flag, setFlag] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const { setToken, setEmail, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: phoneNumber,
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);

  const setUpRecaptcha = async (number) => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'normal',
        callback: () => {
          console.log("reCAPTCHA verified successfully");
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          setError("reCAPTCHA expired. Please refresh and try again.");
        }
      }
    );
    window.recaptchaVerifier.render();

    try{
        const confirmationResult = await signInWithPhoneNumber(auth, number, window.recaptchaVerifier);
        setConfirmationResult(confirmationResult);
        setFlag(true);
        return confirmationResult;

    }catch(error){
        setError(error.message);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null); // Clear any existing errors

    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 10) {
      setError("Password should be at least 10 characters long");
      return;
    }

    try {
      const userCredential = await confirmationResult.confirm(verificationCode);
      console.log("userCredential:", userCredential);
      setIsLoading(true);
      const data = await authService.signup(formData);
      console.log(data);
      setToken(data.token);
      setEmail(data.email);
      setIsLoading(false);
      alert("User registered successfully");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }

    try {
      await setUpRecaptcha(phoneNumber);
    } catch (error) {
        setError(error.message);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError(null); // Clear any existing errors

    if (!confirmationResult) {
      setError("No confirmation result found. Please try again.");
      return;
    }

    if (!verificationCode) {
        setError("Please enter the verification code.");
        return;
    }

    try {
      const userCredential = await confirmationResult.confirm(verificationCode);
      console.log("userCredential:", userCredential);

      await fetch("http://localhost:8082/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setToken(data.token);
          setEmail(data.em);
          alert("User registered successfully");
          navigate("/");
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
        setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[93.5vh] bg-[#ef4444]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-black text-center mb-4">
          Sign Up
        </h2>
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
            className="w-full p-2 border rounded"
            onChange={(value) => setFormData({ ...formData, phone: value })}
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
        {flag && (
          <form onSubmit={handleVerifyOTP}>
            <input
              type="text"
              name="otp"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Verification Code"
            />
            <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
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
