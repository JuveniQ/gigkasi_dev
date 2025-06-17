// UserContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { User, UserContextType } from '../constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toast } from 'sonner-native';


const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default function UserProvider({ children }: { children: React.ReactNode }) {



  const [user, setUser] = useState<User>(null);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      

      toast.success('Logged in succesfully')
      console.log(AsyncStorage.getAllKeys())
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser({...user, isAuthenticated: false});
  };

  const updateProfile = (info: Partial<User>) => {
    setUser({ ...user, ...info });
  };

  return (
    <UserContext.Provider value={{...user, login, logout, updateProfile, register}}>
      {children}
    </UserContext.Provider>
  );
}