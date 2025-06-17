// UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from 'firebase/auth';
import { User, UserContextType } from '../constants/types';
import { toast } from 'sonner-native';


const UserContext = createContext<UserContextType | null>(null);



export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};


const initUser: User = {
  uid: "",
  displayName: "",
  email: "",
  emailVerified: false,
  isAuthenticated: false,
  phoneVerified: false,
  joinDate: '',
  phone: "",
  rating: 0.0,
  status: 'inactive',
  verified: false,
  bio: "",
  imageUrl: "",
  location: null
}

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) =>{

    })

    return () => unsubscribe();
  })


  const login = async (email: string, password: string) => {
    setLoading(true)
    const useCredentials = await signInWithEmailAndPassword(auth, email, password)
  };

  const register = async (email: string, password: string, name: string) => {
    
  };

  const logout = () => {
    signOut(auth);
    setUser(initUser)
  };

  const updateProfile = (info: Partial<User>) => {
  };

  return (
    <UserContext.Provider value={{...user, login, logout, updateProfile, register, loading}}>
      {children}
    </UserContext.Provider>
  );
}