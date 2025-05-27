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
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Clear any existing reCAPTCHA widget
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (error) {
        console.error("Error clearing recaptcha:", error);
      }
      window.recaptchaVerifier = null;
    }

    // Create a new reCAPTCHA verifier
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
          "expired-callback": () => {
            setError("reCAPTCHA expired. Refresh and try again.");
          },
        }
      );

      // Only render if the container exists
      const container = document.getElementById("recaptcha-container");
      if (container) {
        window.recaptchaVerifier
          .render()
          .then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
          })
          .catch((error) => {
            console.error("Error rendering reCAPTCHA:", error);
            setError("Error loading reCAPTCHA. Please refresh the page.");
          });
      }
    } catch (error) {
      console.error("Error initializing reCAPTCHA:", error);
      setError("Error setting up verification. Please refresh the page.");
    }

    // Cleanup function
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
        } catch (error) {
          console.error("Error clearing recaptcha during cleanup:", error);
        }
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
        return; // Exit early without attempting phone authentication
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
      }
    } catch (err) {
      console.error("Error checking if email exists:", err);
      setError("Error checking email availability. Please try again.");
      return;
    }

    
  };

  // Only proceed with phone authentication if all validations pass
    const phoneVerification = async() => {
      if (isValid) {
        try {
          const confirmation = await signInWithPhoneNumber(
            auth,
            phoneNumber,
            window.recaptchaVerifier
          );
          setConfirmationResult(confirmation);
          setFormStep("otp");
        } catch (err) {
          console.error("Error during phone verification:", err);
          setError(err.message);

          // Reset reCAPTCHA on error
          if (window.recaptchaVerifier) {
            try {
              window.recaptchaVerifier.clear();
              window.recaptchaVerifier = null;

              // Re-initialize reCAPTCHA
              window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                  size: "normal",
                  callback: () => {
                    console.log("reCAPTCHA solved");
                  },
                  "expired-callback": () => {
                    setError("reCAPTCHA expired. Refresh and try again.");
                  },
                }
              );
              window.recaptchaVerifier.render();
            } catch (error) {
              console.error("Error resetting reCAPTCHA:", error);
            }
          }
        }
      }
    }
    
    useEffect(()=>{
      if (isValid) {
        phoneVerification();
      }
    }, [isValid]);

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
      // alert("User registered successfully");
      navigate("/");
    } catch (err) {
      console.error("Error confirming OTP:", err);
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

export default SignUp;
