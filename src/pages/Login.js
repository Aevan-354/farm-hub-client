import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure this file has spinner styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      localStorage.setItem("user", JSON.stringify(res.data.user));
  
      // Delay navigation slightly to allow spinner to finish
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Check your credentials.");
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      {/* Show spinner only when loading */}
      {loading ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Please wait...</p>
        </div>
      ) : (
        <form className="login-box" onSubmit={handleLogin}>
          <h2>Sign in</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign in</button>
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
           {/* Back Home Button */}
        <button className="back-home-btn" onClick={() => navigate("/")}>
          Back Home
        </button>
        </form>
      )}
    </div>
  );
};

export default Login;
