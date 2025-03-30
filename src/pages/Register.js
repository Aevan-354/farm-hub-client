import "../styles.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Use this state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        phone,
        password,
      });

      setSuccessMessage("Registration Successful! Redirecting to login...");
      
      // Automatically navigate to login page after 1 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration Failed: Server Error");
    }
  };

  return (
    <>
      {/* Success message at the very top */}
      {successMessage && (
        <div className="success-message-box">
          <p>{successMessage}</p>
        </div>
      )}
  
      <div className="login-container">
        <form className="login-box" onSubmit={handleRegister}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Contact"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <p>
            Already have an account? <a href="/login">Sign in</a>
          </p>
          <button className="back-home-btn" onClick={() => navigate("/")}>
            Back Home
          </button>
        </form>
      </div>
    </>
  );  
};

export default Register;
