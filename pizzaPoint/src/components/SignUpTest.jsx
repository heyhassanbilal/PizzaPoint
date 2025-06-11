import React, { useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const SignUpTest = () => {
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

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
          "expired-callback": () => console.log("reCAPTCHA expired"),
        }
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    e.preventDefault();
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
        return; // Exit early without attempting phone and email authentication
      }
    }

    // Check if email exists (async operation)
    try {
      const emailAlreadyExists = await authService.emailExists(email);
      if (emailAlreadyExists.exists) {
        setError("Email already exists");
        console.log("Email already exists");
        return; // Exit early without attempting phone authentication
      } else {
        setValid(true);
        sendOtp();
      }
    } catch (err) {
      console.error("Error checking if email exists:", err);
      setError("Error checking email availability. Please try again.");
      return;
    }
  };

  const sendOtp = async () => {
    try {
      setError("");
      setMessage("");
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhoneNumber = "+" + phoneNumber.replace(/\D/g, "");
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        appVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      setMessage("OTP sent successfully");
      setFormStep("otp");
    } catch (err) {
      setError("Error sending OTP: " + err.message);
      if (window.recaptchaVerifier) window.recaptchaVerifier.clear();
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
        setEmail(response.email);
        setToken(response.token);
        // alert("User registered successfully");
        setIsAuthenticated(true);
        navigate("/");
      } catch (err) {
        console.error("Error confirming OTP:", err);
        setError(err.message);
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
