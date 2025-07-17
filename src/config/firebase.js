// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR6agvPGxb3DhLdxguQza2CV2CLKZ22BM",
  authDomain: "loginpage-d84b3.firebaseapp.com",
  projectId: "loginpage-d84b3",
  storageBucket: "loginpage-d84b3.firebasestorage.app",
  messagingSenderId: "496049786895",
  appId: "1:496049786895:web:65f8eb06c4b7a4b787d37a"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app)