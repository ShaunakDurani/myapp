// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY8AmErHsIp-c2sCNsaPrHVYOl360SG2A",
  authDomain: "item-delivery-app.firebaseapp.com",
  projectId: "item-delivery-app",
  storageBucket: "item-delivery-app.firebasestorage.app",
  messagingSenderId: "28251526714",
  appId: "1:28251526714:web:328e4a378876cccf618703",
  measurementId: "G-4T25N8V73Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
