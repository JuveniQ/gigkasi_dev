import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

let auth;
try {
  auth = getAuth(app);
} catch (e) {
  const auth = initializeAuth(app, {
  persistence: {
    ...getReactNativePersistence(AsyncStorage),
    async setItem(key, value){
      if (key.includes('session')) {
        await SecureStore.setItemAsync(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    },
    async getItem(key) {
      if (key.includes('session')) {
        return await SecureStore.getItemAsync(key);
      }
      return await AsyncStorage.getItem(key);
    },
    async removeItem(key){
      await Promise.all([
        SecureStore.deleteItemAsync(key),
        AsyncStorage.removeItem(key)
      ]);
    }
  }
});

}

export { auth };
