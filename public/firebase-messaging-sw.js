//works as service worker
importScripts("https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js")

const firebaseConfig = {
  apiKey: "AIzaSyDi4v-dFpukq-7AML_8MwgMc4r4Y_P3RJQ",
  authDomain: "refrigeratsfirebase.firebaseapp.com",
  projectId: "refrigeratsfirebase",
  storageBucket: "refrigeratsfirebase.appspot.com",
  messagingSenderId: "634305726339",
  appId: "1:634305726339:web:97e893116cab197e3058b6",
  measurementId: "G-SG2HFYZCPL"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();