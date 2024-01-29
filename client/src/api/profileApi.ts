import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export function getProfile() {
  return fetch(`${import.meta.env.VITE_API_URL}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => response.json());
}

export function registerWithEmailAndPassword(auth: Auth, email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginWithEmailAndPassword(auth: Auth, email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
