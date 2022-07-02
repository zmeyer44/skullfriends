// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHV619c8rSj0J8f5puHgs4ZvKGMOrQ8_E",
  authDomain: "skullfriends-e7f17.firebaseapp.com",
  projectId: "skullfriends-e7f17",
  storageBucket: "skullfriends-e7f17.appspot.com",
  messagingSenderId: "40272101450",
  appId: "1:40272101450:web:26c60d56b6ef5e05d626b3",
  measurementId: "G-H6F065357P",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export default app;
export { auth, db, storage };
