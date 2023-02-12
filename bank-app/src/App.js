import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import LoginNice from "./pages/LoginNice";
import RegisterNice from "./pages/RegisterNice";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginNice />} />
        <Route path="/login" element={<LoginNice />} />
        <Route path="/register" element={<RegisterNice />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
