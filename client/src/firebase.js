// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVsNIY8MfU5lPuwHBNxbEjCZfw-90MNlE",
  authDomain: "hack-43b9d.firebaseapp.com",
  projectId: "hack-43b9d",
  storageBucket: "hack-43b9d.firebasestorage.app",
  messagingSenderId: "317914371829",
  appId: "1:317914371829:web:d91e47c688dc9d251657bc",
  measurementId: "G-4HV5R3GQ24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);