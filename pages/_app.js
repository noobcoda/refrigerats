import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import ReactNotificationComponent from "../components/Notifications/ReactNotification";
import Notifications from '../components/Notifications/Notifications';
import React, {useState, useEffect} from "react";
import { firebaseCloudMessaging } from "../webPush";
import {getAToken } from "../firebase";
import { getMessaging, onMessage } from "firebase/messaging";
import "../firebase";

function MyApp({ Component, pageProps: {session, ...pageProps} }) {


  const [show,setShow] = useState(false);
  const [notification, setNotification] = useState({title:"",body:""});
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    getAToken(setTokenFound);
    console.log(show,notification);
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
    });
    // onMessageListener().then(payload => {
    //   setShow(true);
    //   setNotification({title: payload.notification.title, body: payload.notification.body})
    //   console.log(payload);
    // }).catch(err => console.log("failed ",err));
  })

  return (
    <div>

      <SessionProvider session={session}>
        <RecoilRoot> 
          <Component {...pageProps} />
          {show? (
            <ReactNotificationComponent title={notification.title} body={notification.body} />):(<></>)
          }
          {/* <Notifications /> used for getting token and console logging it */}
        </RecoilRoot>
      </SessionProvider>
    </div>

  )
}

export default MyApp
