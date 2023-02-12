import React, { useState } from "react";
import "./Register.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !phone || !email) {
      alert("All fields are required.");
      return;
    }

    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);

    // Add your code to submit the form data to the server here
  };

  return (
    <div className="register-body">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Pseudo Bank App</h1>
        <h2 className="register-header">Registration</h2>
        <div className="form-group">
          <label className="input-label" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="input-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="input-label" htmlFor="phone">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label className="input-label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
