import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NikeLogo from "/images/NikeLogoo.png";
import Nike from "/images/Nike.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const email = (formData.email || "").trim().toLowerCase();
      const password = (formData.password || "").trim();

      const url = `http://localhost:5000/users?email=${encodeURIComponent(
        email,
      )}`;
      console.log("Login request ->", url);

      const response = await fetch(url);
      if (!response.ok) {
        console.error("Server error", response.status);
        setError("Something went wrong");
        return;
      }

      const users = await response.json();
      console.log("Users fetched:", users);

      const matched = Array.isArray(users)
        ? users.find(
            (u) =>
              (u.email || "").toLowerCase() === email &&
              (u.password || "") === password,
          )
        : null;

      if (matched) {
        localStorage.setItem("nikeUser", JSON.stringify(matched));
        if (matched.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid Email or Password");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <header className="login-navbar">
        <img src={NikeLogo} alt="Nike Logo" />
      </header>

      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">
            <img src={Nike} alt="Nike" />
          </div>

          <h1>Login</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="login-actions">
              <Link to="/forgot-password" className="forgot-link">
                forgot password ?
              </Link>

              <button type="submit">Submit</button>
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="register-link">
              <Link to="/register">create new account ?</Link>
            </div>

            <div className="bottom-line"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
