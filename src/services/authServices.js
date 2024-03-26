import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/index";

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signout() {
  return signOut(auth);
}

export function setProfileData(userID, userData) {
  return setDoc(doc(db, "user", userID), userData);
}

export function getProfileData(userID) {
  return getDoc(doc(db, "user", userID));
}
