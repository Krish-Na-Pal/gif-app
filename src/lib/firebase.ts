// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "gif-app-d2d18.firebaseapp.com",
  projectId: "gif-app-d2d18",
  storageBucket: "gif-app-d2d18.appspot.com",
  messagingSenderId: "17253672659",
  appId: "1:17253672659:web:59741c0c5005f49a911626",
  measurementId: "G-SN64RJCEJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };