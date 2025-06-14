import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';

const firebaseConfig = {
  apiKey: "AIzaSyANvGxAuDs40pqFGaVkQgepr2PKV7woums",
  authDomain: "gigkasi-dev.firebaseapp.com",
  projectId: "gigkasi-dev",
  storageBucket: "gigkasi-dev.appspot.com",
  messagingSenderId: "70042553618",
  appId: "1:70042553618:web:714c6b3c6f6f9821e4f7cb",
  measurementId: "G-9HGD1NDPL0"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];


const secureStorePersistence = {
  setItem: async (key, value) => await SecureStore.setItemAsync(key, value),
  getItem: async (key) => await SecureStore.getItemAsync(key),
  removeItem: async (key) => await SecureStore.deleteItemAsync(key),
};

// ✅ Prevent double-auth init
let auth;
try {
  auth = getAuth(app); // Try getting the auth instance
} catch (e) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(secureStorePersistence),
  });
}

const db = initializeFirestore(app, {});

export { auth, db };
