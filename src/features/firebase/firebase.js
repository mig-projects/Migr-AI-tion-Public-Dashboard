import { initializeApp } from "firebase/app";
import { getApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";

const firebaseKey = import.meta.env.VITE_FIREBASE_API_KEY;
const firebaseAppID = import.meta.env.VITE_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "migr-ai-tion.firebaseapp.com",
  projectId: "migr-ai-tion",
  storageBucket: "migr-ai-tion.appspot.com",
  messagingSenderId: "155139933891",
  appId: firebaseAppID,
  measurementId: "G-22WHCNFXH6"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const functions = getFunctions(getApp());
const getSummary = httpsCallable(functions, 'get_summary_text');

export { getSummary };
