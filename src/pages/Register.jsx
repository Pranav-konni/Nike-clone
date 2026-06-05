import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NikeLogo from "/images/NikeLogoo.png";
import Nike from "/images/Nike.png";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: "user",
    };

    try {
      const response = await fetch("http://localhost:5000/users");

      const users = await response.json();

      const existingUser = users.find(
        (user) => user.email === formData.email
      );

      if (existingUser) {
        alert("User already exists");
        return;
      }

      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      alert("Account created successfully");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="top-logo">
        <img src={NikeLogo} alt="nike" />
      </div>

      <div className="register-card">
        <div className="card-logo">
          <img src={Nike} alt="nike" />
        </div>

        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>

        <div className="bottom-links">
          <p>
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;