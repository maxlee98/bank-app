import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your authentication logic here
    if (username === "admin" && password === "admin") {
      console.log(`Username: ${username}, Password: ${password}`);
      navigate("/home");
    } else {
      alert("Username or password is incorrect.");
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login-body">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Pseudo Bank App</h1>
        <h2 className="login-header">Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <div>
          <button className="register-btn btn" onClick={handleRegistration}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
