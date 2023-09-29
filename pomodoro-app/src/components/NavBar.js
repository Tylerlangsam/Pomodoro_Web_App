import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="app-title">Pomodoro Timer</h1>
      <div className="nav-links">
        <Link to="" className="nav-button">
          Timer
        </Link>
        <Link to="" className="nav-button">
          Stats
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;