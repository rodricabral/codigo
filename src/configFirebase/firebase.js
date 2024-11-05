// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFAQNf7whH3TgH7wcU_2H2A6ATi2qFeFY",
  authDomain: "practicando-firebase-8240a.firebaseapp.com",
  projectId: "practicando-firebase-8240a",
  storageBucket: "practicando-firebase-8240a.appspot.com",
  messagingSenderId: "482859296611",
  appId: "1:482859296611:web:8716a7bd4c0cd68d251556"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
