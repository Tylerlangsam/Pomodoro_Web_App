import Pomodoro from './Pomodoro'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pomodoro />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;