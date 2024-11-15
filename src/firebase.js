// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, onAuthStateChanged } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAw_nRmr2P7utZhFJzdeD8DV_C9pXEcg7w",
  authDomain: "lixt-c7481.firebaseapp.com",
  projectId: "lixt-c7481",
  storageBucket: "lixt-c7481.appspot.com",
  messagingSenderId: "851838885385",
  appId: "1:851838885385:web:047081a3010a41962da2d8",
  measurementId: "G-TW1STYG9W9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { collection, addDoc, doc, updateDoc, deleteDoc, onAuthStateChanged };