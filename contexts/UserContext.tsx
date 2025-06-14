// UserContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { User, UserContextType } from '../constants/types';


const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    id: "",
    name: "John Doe",
    imageUrl: "https://api.a0.dev/assets/image?text=TM&aspect=1:1",
    rating: 0,
    verified: false,
    joinDate: "",
    completedJobs: 0,
    requestsMade: 0,
    services: [],
    requests: [],
    portfolio: [],
    qualifications: [],
    status: "",
    loggedIn: false,
  });

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      
      setUser({
        ...user,
        id: userCredential.user.uid,
        name: userCredential.user.displayName || 'Jay Nhlapho',
        email: userCredential.user.email || '',
        imageUrl: userCredential.user.photoURL || 'https://cdn.download.ams.birds.cornell.edu/api/v2/asset/311635911/900',
        loggedIn: true,
        verified: userCredential.user.emailVerified,
        joinDate: new Date().toLocaleDateString(),
      });
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      setUser({
        ...user,
        id: userCredential.user.uid,
        name: name,
        email: email,
        loggedIn: true,
        verified: false,
        joinDate: new Date().toLocaleDateString(),
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser({
      ...user,
      loggedIn: false,
    });
  };

  const updateProfile = (info: Partial<User>) => {
    setUser({ ...user, ...info });
  };

  return (
    <UserContext.Provider value={{ ...user, login, register, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}