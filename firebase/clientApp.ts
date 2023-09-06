import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const whichDB: string = "firebase"
var clientCredentials: any;

if(whichDB === "realtime") {
    clientCredentials = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
} else {
    clientCredentials = {
        apiKey: 'AIzaSyD73n-uXTYWGY1Pwb3VVuKFeyjzG6AjnuA',
        authDomain: 'todo-325f4.firebaseapp.com',
        projectId: 'todo-325f4',
        storageBucket: 'todo-325f4.appspot.com',
        messagingSenderId: '83698156822',
        appId: '1:83698156822:web:827893ce709617e46ebc37',
    };
}

export const firebaseApp = initializeApp(clientCredentials);

export const firestoreDb = getFirestore(firebaseApp);
