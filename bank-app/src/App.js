import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Landing";

import LoginPage from "./pages/Login";
import LoginNice from "./pages/LoginNice";
import RegisterPage from "./pages/Register";
import RegisterNice from "./pages/RegisterNice";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-nice" element={<LoginNice />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-nice" element={<RegisterNice />} />
      </Routes>
    </BrowserRouter>
  );
}
