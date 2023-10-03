import Pomodoro from "./Pomodoro";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
