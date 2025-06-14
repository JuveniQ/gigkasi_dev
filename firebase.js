import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import {  initializeFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'; 

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

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});


const db = initializeFirestore(app, {});


export { auth, db }