import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { ref, get } from "firebase/database";
import NavBar from "./NavBar";
import { onAuthStateChanged } from "firebase/auth";

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
        });
      } else {
        console.log("User is not authenticated");
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="stats">
      <NavBar user={user} />
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
