// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsBp5AuTZavBuCTgwa-f468Yb52EVUTAk",
  authDomain: "authentication-project-257fb.firebaseapp.com",
  projectId: "authentication-project-257fb",
  storageBucket: "authentication-project-257fb.appspot.com",
  messagingSenderId: "1090969711501",
  appId: "1:1090969711501:web:7a2a8f62d0dff2c13743c4",
  measurementId: "G-1LBCERJGVR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
