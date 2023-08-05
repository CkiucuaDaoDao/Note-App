// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClnQ_Ufhs8K3fpAeeEa1DuQNLq-v_fTYY",
  authDomain: "note-app-2ba86.firebaseapp.com",
  projectId: "note-app-2ba86",
  storageBucket: "note-app-2ba86.appspot.com",
  messagingSenderId: "1027501038618",
  appId: "1:1027501038618:web:2da5dbabe968ba43d7c5a3",
  measurementId: "G-XHMT4KDPFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);