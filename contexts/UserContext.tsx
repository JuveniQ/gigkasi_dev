// UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore'
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
  const [user, setUser] = useState<User>(initUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoading(true)
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

              setLoading(false)
              //@ts-ignore
              navigation.navigate('MainTabs');
            }
          })
          .catch((error) => {
            console.log(error.message)
            setLoading(false)
            toast.error("Failed To Login, please try again");
            setUser(initUser);
          });
      }
    });

    return () => unsubscribe();
  }, []);




  const login = async (email: string, password: string) => {
    const useCredentials = await signInWithEmailAndPassword(auth, email, password)
  };

  const register = async (email: string, password: string, name: string) => {
    const userCredentials = createUserWithEmailAndPassword(auth, email, password)

    const userRef = doc(db, "users", (await userCredentials).user.uid)
    setDoc(userRef, {
      ...initUser,
      displayName: name,
      isAuthenticated:true, 
      joinDate: new Date().toISOString(),
      status: "active"
    })
    setLoading(false)

    //@ts-ignore
    navigation.navigate('MainTabs', {replace: true});
  };

  const logout = () => {
    signOut(auth);
    setUser(initUser)
  };

  const updateProfile = (info: Partial<User>) => {
  };

  return (
    <UserContext.Provider value={{ ...user, login, logout, updateProfile, register, loading }}>
      {children}
    </UserContext.Provider>
  );
}

