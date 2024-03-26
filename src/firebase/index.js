// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCglzFZoLMffaNbrUqiAnXRVP_81U1jYwI",
  authDomain: "todo-mern-833f1.firebaseapp.com",
  projectId: "todo-mern-833f1",
  storageBucket: "todo-mern-833f1.appspot.com",
  messagingSenderId: "577096929659",
  appId: "1:577096929659:web:39f06185af3637383f2dde",
  measurementId: "G-WH72DKDXQ6"
};

// Initialize Firebase

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
// const storage = getStorage()


export { auth, db };