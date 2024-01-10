import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";

const API_URL = 'http://localhost:5000'; // TODO

export function getProfile () {
  return fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
}

export function loginWithEmailAndPassword (auth, email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function registerWithEmailAndPassword (auth, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}
