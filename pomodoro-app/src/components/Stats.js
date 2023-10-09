import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { db, auth } from "../firebase";
import { ref, get, child } from "firebase/database";

function Stats() {
  const [totalBreakTime, setTotalBreakTime] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userUID = user.uid;
      const path = `users/${userUID}/studySessions`;
      console.log("Path:", path)
      const userRef = ref(db, path);

      // Initialize total times
      let breakTime = 0;
      let studyTime = 0;

      // Fetch and calculate total times
      get(child(userRef)).then((snapshot) => {
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
      });
    } else {
        console.log("User is not authenticated")
    }
  }, []);

  return (
    <div className="stats">
      <NavBar />
      <div className="stats-container">
        <h2>Stats</h2>
        <div>
          <p>Total Break Time: {totalBreakTime} seconds</p>
          <p>Total Study Time: {totalStudyTime} seconds</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
