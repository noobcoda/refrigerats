import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';

export const firebaseCloudMessaging = {
    //check whether token is available in indexed DB
    tokenInlocalforage: async () => {
    return localforage.getItem('fcm_token');
    },

    //initialize firebase app
    init: async function () {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyDi4v-dFpukq-7AML_8MwgMc4r4Y_P3RJQ",
                authDomain: "refrigeratsfirebase.firebaseapp.com",
                projectId: "refrigeratsfirebase",
                storageBucket: "refrigeratsfirebase.appspot.com",
                messagingSenderId: "634305726339",
                appId: "1:634305726339:web:97e893116cab197e3058b6",
                measurementId: "G-SG2HFYZCPL"
            });

            try {
                const messaging = firebase.messaging();
                const tokenInLocalForage = await this.tokenInlocalforage();

                //if FCM token already exists, just return the function
                if (tokenInLocalForage !== null) {
                    return tokenInLocalForage;
                }

                //request notif permission from browser
                const status = await Notification.requestPermission();

                if (status && status === "granted") {
                    //get token from FCM
                    const fcm_token = await messaging.getToken();

                    if (fcm_token) {
                        //set FCM token in indexed db using localforage
                        localforage.setItem('fcm_token',token);
                        console.log('fcm_token',token);

                        //return FCM token
                        return token;
                    }
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        } 
    }
}