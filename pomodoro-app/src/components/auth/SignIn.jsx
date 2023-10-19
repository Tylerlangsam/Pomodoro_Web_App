import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import NavBar from "../NavBar";
import { Link, useNavigate } from "react-router-dom"; 
import { db } from "../../firebase";
import { ref, set } from 'firebase/database';
import './Auth.scss'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Get the UID of the signed-in user
        const user = userCredential.user;
        const uid = user.uid;

        // Create a reference to the user's data in the database
        const userRef = ref(db, `users/${uid}`);

        // Set the UID in the database
        set(userRef, {
          uid: uid,
        }).then(() => {
          // Redirect the user to the "/pomodoro" route
          navigate("/pomodoro");
        });
      })
      .catch((error) => {
        // Handle sign-in errors if needed
        console.error(error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="auth-container">
        <form onSubmit={signIn}>
          <h1>Log In to your Account</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}></input>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
          <button type="submit" className="btn">Log In</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
