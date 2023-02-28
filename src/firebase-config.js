// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzyKA5HdhEZl2z57JWsjq0tNaKR1EwYe8",
  authDomain: "chat-tut-96e3a.firebaseapp.com",
  projectId: "chat-tut-96e3a",
  storageBucket: "chat-tut-96e3a.appspot.com",
  messagingSenderId: "789475170263",
  appId: "1:789475170263:web:0d764475652bb52be81d92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)