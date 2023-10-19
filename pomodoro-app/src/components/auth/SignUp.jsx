import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import NavBar from "../NavBar";
import './Auth.scss'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Get the UID of the signed-up user
        const user = userCredential.user;
        const uid = user.uid;

        // Create a reference to the user's data in the database
        const userRef = ref(db, `users/${uid}`);

        // Set the UID in the database
        set(userRef, {
          uid: uid,
        }).then(() => {
          // Redirect to "/pomodoro" on successful sign-up
          navigate("/pomodoro");
        });
      })
      .catch((error) => {
        // Handle sign-up errors if needed
        console.error("Sign-up error:", error);
      });
  };

  return (
    <div>
        <NavBar />
      <div className="auth-container">
        <form onSubmit={signUp}>
          <h1>Create Account</h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
