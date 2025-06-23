import { React, useState, useContext, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { authService } from "../utils/services";
import { use } from "react";

export default function AdminLogin() {
  const { setToken, setEmail } = useAuth();
  const [verificationCode, setVerificationCode] = useState("");
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);
  const [formStep, setFormStep] = useState("form"); // "form", "otp"
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // You can send the form data to the server here
    try {
      const data = await authService.adminLogin(formData);
      setStatus(data.otpSent);
      if (status) {
        setError("Invalid email or password");
        return;
      }
      setFormStep("otp");
      console.log("Success:", data);
      //   setToken(data.token);
      //   setEmail(data.email);
      //   navigate("/adminP");
      // alert("User login successfull");
      // });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const otp = verificationCode.trim();
      if (!otp) {
        setError("OTP is required");
        return;
      }
      const data = await authService.adminOTPcheck({
        email: formData.email,
        otp,
      });
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setEmail(data.email);
        navigate("/admin");
      } else {
        setError("Invalid OTP");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[93.5vh] bg-[#dc2626]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-black">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {formStep === "form" ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Login
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit}>
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
      </div>
    </div>
  );
}
