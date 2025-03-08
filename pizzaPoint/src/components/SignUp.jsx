import { React, useState,useContext } from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from '../utils/useAuth';

const SignUp = () => {
  const { setToken, setEmail } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
    }
    if (formData.password.length <= 10) {
      alert("Password should be atleast 10 characters long");
    }

    // You can send the form data to the server here
    try {
      fetch("http://localhost:8082/auth/signup", {
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
    } catch (error) {
      console.error("Error:", error);
    }

  };

  return (
    <div className="flex justify-center items-center min-h-[93.5vh] bg-[#ef4444]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-black text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" className="w-full p-2 border rounded" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 border rounded" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone" className="w-full p-2 border rounded" onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" className="w-full p-2 border rounded" onChange={handleChange} required />
          <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;