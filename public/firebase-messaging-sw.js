
import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDi4v-dFpukq-7AML_8MwgMc4r4Y_P3RJQ",
  authDomain: "refrigeratsfirebase.firebaseapp.com",
  projectId: "refrigeratsfirebase",
  storageBucket: "refrigeratsfirebase.appspot.com",
  messagingSenderId: "634305726339",
  appId: "1:634305726339:web:97e893116cab197e3058b6",
  measurementId: "G-SG2HFYZCPL"
});

//retrieve instance of firebase messaging so it can handle background messages
const messaging = getMessaging(firebaseConfig);

onBackgroundMessage(messaging, (payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  }

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});