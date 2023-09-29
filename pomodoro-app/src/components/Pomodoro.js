import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./Pomodoro.scss";

function Pomodoro() {
  // State variables for timer settings
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  // State variable for the current time left on the timer
  const [timerMinutes, setTimerMinutes] = useState(workTime);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // State variable to track whether the timer is running or paused
  const [isRunning, setIsRunning] = useState(false);

  // Function to start the timer
  const startTimer = () => {
    setIsRunning(true);
  };
  // Function to pause the timer
  const pauseTimer = () => {
    setIsRunning(false);
  };
  // Function to reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimerMinutes(workTime);
    setTimerSeconds(0);
  };
  // Function to update work time
  const updateWorkTime = (newTime) => {
    setWorkTime(newTime);
    resetTimer(); // Reset the timer when work time changes
  };
  // Function to update break time
  const updateBreakTime = (newTime) => {
    setBreakTime(newTime);
    resetTimer(); // Reset the timer when break time changes
  };

  // Use the useEffect hook to update the timer every second
  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            //Timer is done
            setIsRunning(false);
          } else {
            // Decrement the minutes and set seconds to 59
            setTimerMinutes(timerMinutes - 1);
            setTimerSeconds(59);
          }
        } else {
          // Decrement the seconds
          setTimerSeconds(timerSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, timerMinutes, timerSeconds]);
  // Clean up the interval when the component unmounts

  return (
    <div className="pomodoro">
      <NavBar />
      <div className="app-container">
        <div className="timer-settings">
          {/* Work Time */}
          <div className="setting">
            <h2 className="setting-title">Work Time</h2>
            <div className="setting-content">
              <span className="setting-label">Set the duration of your work sessions:</span>
              <div className="time">{workTime} minutes</div>
              <h2 className="setting-title">Adjust Work Time</h2>
              <input
                type="number"
                min="1"
                max="60"
                value={workTime}
                onChange={(e) => updateWorkTime(parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Break Time */}
          <div className="setting">
            <h2 className="setting-title">Break Time</h2>
            <div className="setting-content">
              <span className="setting-label">Set the duration of your break sessions:</span>
              <div className="time">{breakTime} minutes</div>
              <h2 className="setting-title">Adjust Break Time</h2>
              <input
                type="number"
                min="1"
                max="60"
                value={breakTime}
                onChange={(e) => updateBreakTime(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="timer-display">
          <div className={`timer ${isRunning ? "running" : ""}`}>
            <span className="timer-text">
              {timerMinutes < 10 ? "0" + timerMinutes : timerMinutes}:
              {timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}
            </span>
          </div>
        </div>
        <div className="timer-controls">
          <button className="control-button start-button" onClick={startTimer} disabled={isRunning}>
            Start
          </button>
          <button
            className="control-button pause-button"
            onClick={pauseTimer}
            disabled={!isRunning}>
            Pause
          </button>
          <button className="control-button reset-button" onClick={resetTimer}>
            Reset
          </button>
        </div>
        <div className="bubbles">
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
          <div className="bubble"></div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
