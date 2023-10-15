import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { ref, get } from "firebase/database";
import NavBar from "./NavBar";
import { onAuthStateChanged } from "firebase/auth";
import "./Statistics.css";
import Chart from "chart.js/auto";

function Stats() {
  const [user, setUser] = useState(null); // Initialize user state
  const [totalBreakTime, setTotalBreakTime] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);

  useEffect(() => {
    // Listen for changes in the user's authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set the user object
        setUser(user);
        const userUID = user.uid;
        const path = `users/${userUID}/studySessions`;
        const userRef = ref(db, path);

        // Initialize total times
        let breakTime = 0;
        let studyTime = 0;

        // Fetch and calculate total times
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((sessionSnapshot) => {
              const sessionData = sessionSnapshot.val();
              const { sessionType, duration } = sessionData;

              // Check session type and add to corresponding total time
              if (sessionType === "break") {
                breakTime += duration;
              } else if (sessionType === "study") {
                studyTime += duration;
              }
            });

            // Update state with total times
            setTotalBreakTime(breakTime);
            setTotalStudyTime(studyTime);
          }
          // Create a data array for pie chart
          const data = {
            labels: ["Study Time", "Break Time"],
            datasets: [
              {
                data: [totalStudyTime, totalBreakTime],
                backgroundColor: ["#36A2EB", "FFCE56"], //Colors for chart sections
              },
            ],
          };

          //Create the pie chart
          const chartContainer = document.getElementById("myPieChart");
          new Chart(chartContainer, {
            type: "pie",
            data: data,
          });
        });
      } else {
        console.log("User is not authenticated");
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [totalBreakTime, totalStudyTime]);

  return (
    <div className="stats">
      <NavBar user={user} />
      <div className="stats-container">
        <h2 className="stats-title">Stats</h2>
        <canvas id="myPieChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
}

export default Stats;
