import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-VB7culJvoZAs7fe8_A-EX0dINZOo3yM",
  authDomain: "cursovue3piniafirebase9bluuweb.firebaseapp.com",
  projectId: "cursovue3piniafirebase9bluuweb",
  storageBucket: "cursovue3piniafirebase9bluuweb.appspot.com",
  messagingSenderId: "574444096670",
  appId: "1:574444096670:web:7e6571414c219a61617f8f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // https://firebase.google.com/docs/auth/web/start?hl=es&authuser=0

export {auth}