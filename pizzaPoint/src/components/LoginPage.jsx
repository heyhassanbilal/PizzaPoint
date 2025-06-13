import { React, useState, useContext, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { authService } from "../utils/services";

export default function LoginPage() {
  const { setToken, updateEmail, updateName, isAuthenticatedFunc, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    // You can send the form data to the server here
    try {
      // fetch("http://localhost:8082/auth/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // })
      //   .then((response) => response.json())
        // .then((data) => {
          const data = await authService.login(formData);
          console.log("Success:", data);
          updateEmail(data.email);
          updateName(data.name);
          setToken(data.token);
          console.log("Token set:", data);
          setIsAuthenticated(true);
          
          // isAuthenticatedFunc();
          // alert("User login successfull");
          navigate("/");
        // });
    } catch (error) {
      setError("Invalid email or password");
      console.error("Error:", error);
    }
  };

  

  return (
    <div className="flex items-center justify-center min-h-[93.5vh] bg-[#dc2626]">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-black">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
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
            <label className="block text-sm font-semibold mb-1">Password</label>
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
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-red-500 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
