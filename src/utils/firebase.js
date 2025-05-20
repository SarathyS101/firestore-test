// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVCMV4JUHb_7PHHafBSh6pfjoNKc15cII",
  authDomain: "mini-project-21dbf.firebaseapp.com",
  projectId: "mini-project-21dbf",
  storageBucket: "mini-project-21dbf.firebasestorage.app",
  messagingSenderId: "960134998364",
  appId: "1:960134998364:web:0da1636f7ea06268947999",
  measurementId: "G-YWNEDD2GDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;