// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore();
const storage = getStorage();
const messaging = getMessaging();

export { app, db, storage, messaging };

