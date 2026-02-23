import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
        name,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "black" }}
    >
      <div
        style={{
          width: "360px",
          backgroundColor: "#1e1e1e",
          padding: "30px",
          borderRadius: "14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
          color: "white",
        }}
      >
        <h3 className="text-center mb-4">TICK-TOCK Register</h3>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                height: "40px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "#2a2a2a",
                color: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                height: "40px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "#2a2a2a",
                color: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                height: "40px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "#2a2a2a",
                color: "white",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              height: "42px",
              backgroundColor: "#2c2c2c",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
          >
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#4ea8ff" }}>
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Register;
