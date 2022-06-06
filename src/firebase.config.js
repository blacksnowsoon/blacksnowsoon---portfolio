// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV-JZLgcnBHdau5mqWaid5V-0Y7HjVrvc",
  authDomain: "portfolio-d9b33.firebaseapp.com",
  projectId: "portfolio-d9b33",
  storageBucket: "portfolio-d9b33.appspot.com",
  messagingSenderId: "999812688323",
  appId: "1:999812688323:web:85f0448fb2e39ece2c3576",
  measurementId: "G-2QBJGR56MZ"
};

// Initialize Firebase
const appFire = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFire);
const auth = getAuth(appFire);
const rtDb = getDatabase(appFire);
