import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user }) {
  return (
    <nav className="navbar">
      <h1 className="app-title">Pomodoro Timer</h1>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/pomodoro" className="nav-button">
              Timer
            </Link>
            <Link to="/stats" className="nav-button">
              Stats
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup" className="nav-button">
              Sign Up
            </Link>
            <Link to="/" className="nav-button">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
