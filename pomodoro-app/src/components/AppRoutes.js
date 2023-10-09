import Pomodoro from "./Pomodoro";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Stats from "./Stats";
import React from "react";
import { auth } from "../firebase";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function isAuthenticated(){
  const user = auth.currentUser
  return user!==null
}
function ProtectedRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/" />;
}


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/stats" element={<Stats />} />
        {/* Use ProtectedRoute for protected routes */}
        <Route path="/pomodoro" element={<ProtectedRoute element={<Pomodoro />} />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
