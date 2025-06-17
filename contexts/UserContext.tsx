// UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from 'firebase/auth';
import { User, UserContextType } from '../constants/types';
import { toast } from 'sonner-native';
import { useNavigation } from '@react-navigation/native';


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
  const navigation = useNavigation();
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const userData = getDoc(doc(db, 'users', firebaseUser.uid));
      userData
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as User;
            setUser({
              ...data,
              isAuthenticated: true,
            });
            //@ts-ignore
            navigation.replace('MainTabs');
          }
        })
        .catch((error) => {
          toast.error("Failed To Login, please try again later");
          setUser(initUser);
        });
    } 
  });

  return () => unsubscribe();
}, []);




  const login = async (email: string, password: string) => {
  };

  const register = async (email: string, password: string, name: string) => {
  };

  const logout = () => {
  };

  const updateProfile = (info: Partial<User>) => {
  };

  return (
    <UserContext.Provider value={{...user, login, logout, updateProfile, register}}>
      {children}
    </UserContext.Provider>
  );
}
   
