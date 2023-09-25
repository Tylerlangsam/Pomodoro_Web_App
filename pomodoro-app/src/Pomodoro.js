import React, { useState } from "react";

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
      clearInterveral(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, timerMinutes, timerSeconds]);
  // Clean up the interval when the component unmounts

  return (
    <div className="pomodoro">
      {/* Display timer settings (work time, break time) */}
      <div className="timer-settings">
        <div className="work-time">
          <span>Work Time:</span> {workTime} minutes
        </div>
        <div className="break-time">
          <span>Break Time:</span> {breakTime} minutes
        </div>
      </div>

      {/* Display the current time left on the timer */}
      <div className="timer">
        {timerMinutes < 10 ? "0" + timerMinutes : timerMinutes}:
        {timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}
      </div>

      {/* Start, pause, and reset buttons */}
      <div className="timer-controls">
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={pauseTimer} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default Pomodoro;
