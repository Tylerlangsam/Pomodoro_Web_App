import React from "react";

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="app-title">Pomodoro Timer</h1>
      <div className="nav-links">
        <button className="nav-button">Link 1</button>
        <button className="nav-button">Link 2</button>
        <button className="nav-button">Link 3</button>
      </div>
    </nav>
  );
}

export default NavBar;