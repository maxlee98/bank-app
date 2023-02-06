import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function LandingPage() {
  return (
    <div className="home-body">
      <div className="home-form">
        <h2>Choice of Login and Registration Page</h2>
        <form>
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
          <Link to="/login-nice">
            <button className="btn register-btn">LoginNice</button>
          </Link>
        </form>
      </div>
    </div>
  );
}
