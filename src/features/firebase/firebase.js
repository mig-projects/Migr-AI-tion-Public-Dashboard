import { initializeApp } from "firebase/app";
import config from "./config.json";
import { getApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator  } from "firebase/functions";

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const functions = getFunctions(getApp());
const getSummary = httpsCallable(functions, 'get_summary_text');

export { getSummary };
