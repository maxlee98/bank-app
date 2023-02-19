import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import LoginNice from "./pages/LoginNice";
import RegisterNice from "./pages/RegisterNice";
import Insights from "./pages/Insights";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginNice />} />
        <Route path="/login" element={<LoginNice />} />
        <Route path="/register" element={<RegisterNice />} />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/insights"
          element={
            <>
              <Navbar />
              <Insights />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
