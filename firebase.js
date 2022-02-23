// Import the functions you need from the SDKs you need
//https://blog.logrocket.com/push-notifications-with-react-and-firebase/

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDi4v-dFpukq-7AML_8MwgMc4r4Y_P3RJQ",
  authDomain: "refrigeratsfirebase.firebaseapp.com",
  projectId: "refrigeratsfirebase",
  storageBucket: "refrigeratsfirebase.appspot.com",
  messagingSenderId: "634305726339",
  appId: "1:634305726339:web:97e893116cab197e3058b6",
  measurementId: "G-SG2HFYZCPL"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);
//const messaging = getMessaging(app);

export const getAToken = async (setTokenFound) => {
  getToken(messaging, { vapidKey: process.env.VAPID_KEY }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
};

export { app, db, storage };