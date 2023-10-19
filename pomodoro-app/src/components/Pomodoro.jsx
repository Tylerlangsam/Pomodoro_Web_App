import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import TimerStart from "./../TimerStart.mp3";
import ResetAudio from "./../ResetAudio.mp3";
import "./Pomodoro.scss";
import { ref, push, set, child } from "firebase/database";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";



function Pomodoro() {
  // State variables for timer settings
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  //State variable for audio
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  //State variable for reset audio
  const [isResetAudioPlaying, setIsResetAudioPlaying] = useState(false);

  // State variable for the current time left on the timer
  const [timerMinutes, setTimerMinutes] = useState(workTime);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // State variable to track whether the timer is running or paused
  const [isRunning, setIsRunning] = useState(false);

  const [studySessionStartTime, setStudySessionStartTime] = useState(null);

  const [user, setUser] = useState(null); // Initialize user state

  // ...

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set the user object
        setUser(user);
      } else {
        // User is signed out, reset the user object
        setUser(null);
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set the email
        setUserEmail(user.email);
      } else {
        // User is signed out, reset the email
        setUserEmail("");
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsAudioPlaying(true);

      // Capture the start time of the study session
      if (timerMinutes === workTime && timerSeconds === 0) {
        const startTime = Math.floor(new Date().getTime() / 1000); // Get the current timestamp
        setStudySessionStartTime(startTime);
      }
    }
  };
  // Function to pause the timer
  const pauseTimer = () => {
    setIsRunning(false);
    setIsAudioPlaying(false);
    if (studySessionStartTime) {
      const endTime = Math.floor(new Date().getTime() / 1000); // Get the current timestamp in seconds

      // Calculate the duration of the study session
      const durationInSeconds = endTime - studySessionStartTime;

      // Save the study session to the database
      const user = auth.currentUser;
      if (user) {
        const userUID = user.uid;
        const userRef = ref(db, `users/${userUID}`);
        const newSessionRef = push(child(userRef, "studySessions")); // Create a new session ID
        set(newSessionRef, {
          sessionType: "study",
          startTime: studySessionStartTime,
          endTime: endTime,
          duration: durationInSeconds,
        });
      }

      // Reset the start time
      setStudySessionStartTime(null);
    }
  };
  // Function to reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimerMinutes(workTime);
    setTimerSeconds(0);
    setIsResetAudioPlaying(true);
    setIsAudioPlaying(false);
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
      <NavBar user={user} />
      {isAudioPlaying && <audio src={TimerStart} loop autoPlay />}
      {isResetAudioPlaying && (
        <audio
          key={ResetAudio}
          src={ResetAudio}
          autoPlay
          onEnded={() => setIsResetAudioPlaying(false)}
        />
      )}{" "}
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
          <button className="btn" onClick={startTimer} disabled={isRunning}>
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
        <br></br>
        <div className="user-email">Signed in as: {userEmail}</div>
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
