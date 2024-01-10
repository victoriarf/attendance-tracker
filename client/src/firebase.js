import {initializeApp} from "@firebase/app";
import {getFirestore} from 'firebase/firestore/lite';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4OS3MxJGQXvWDdZX6qqHEqb_yydUc4AI",
  authDomain: "payment-tracker-3298d.firebaseapp.com",
  projectId: "payment-tracker-3298d",
  storageBucket: "payment-tracker-3298d.appspot.com",
  messagingSenderId: "662706914212",
  appId: "1:662706914212:web:6cf9e0e6a3c4540806b731"
}; // TODO: no commit this config


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
