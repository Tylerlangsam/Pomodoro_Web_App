import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import NavBar from "../NavBar";
import { useHistory } from "react-router-dom"; 

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Redirect the user to the "/pomodoro" route
        history.push("/pomodoro");
      })
      .catch((error) => {
        // Handle sign-in errors if needed
        console.error(error);
      });
  };

  return (
    <div className="sign-in-container">
      <NavBar />
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default SignIn;
