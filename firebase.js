// Import the functions you need from the SDKs you need
// // v9 syntax
// import { initializeApp } from "firebase/app";

// DEMO CREDENTIALS:
// test@gmail.com
// test123

// v8 syntax:
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_EkbreYUR1P7GT04-BS6RT-cdFiuA3eM",
  authDomain: "mobiledev-finalproject-11413.firebaseapp.com",
  projectId: "mobiledev-finalproject-11413",
  storageBucket: "mobiledev-finalproject-11413.firebasestorage.app",
  messagingSenderId: "509465672543",
  appId: "1:509465672543:web:687a851893cb406f0f94ea",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) app = firebase.initializeApp(firebaseConfig);
else app = firebase.app();
const db = firebase.firestore();
const auth = firebase.auth();
export default firebase;
export { db, auth };
