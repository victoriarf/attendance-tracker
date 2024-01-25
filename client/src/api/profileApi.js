import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export function getProfile() {
  return fetch(`${import.meta.env.VITE_API_URL}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
}

export function registerWithEmailAndPassword(auth, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export function loginWithEmailAndPassword(auth, email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}
