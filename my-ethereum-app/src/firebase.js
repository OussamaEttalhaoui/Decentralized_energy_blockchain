// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDtFOZUv0u9m4d2eH-eEd2RYGqvzvgnEu0",
  authDomain: "blockchanin-project.firebaseapp.com",
  projectId: "blockchanin-project",
  storageBucket: "blockchanin-project.firebasestorage.app",
  messagingSenderId: "438821647056",
  appId: "1:438821647056:web:e6848d7e39bad6931ca4d5",
  measurementId: "G-8BVE6DS6P2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };