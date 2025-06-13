import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyANvGxAuDs40pqFGaVkQgepr2PKV7woums",
  authDomain: "gigkasi-dev.firebaseapp.com",
  projectId: "gigkasi-dev",
  storageBucket: "gigkasi-dev.firebasestorage.app",
  messagingSenderId: "70042553618",
  appId: "1:70042553618:web:714c6b3c6f6f9821e4f7cb",
  measurementId: "G-9HGD1NDPL0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

