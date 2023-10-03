// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIEJIQnCMBGknJNJelulHc_HKsj0HPPdg",
  authDomain: "pomodoro-app-67670.firebaseapp.com",
  projectId: "pomodoro-app-67670",
  storageBucket: "pomodoro-app-67670.appspot.com",
  messagingSenderId: "670492434858",
  appId: "1:670492434858:web:1042cad2638077e0b44bd3",
  measurementId: "G-B2JFFN1VX4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth }