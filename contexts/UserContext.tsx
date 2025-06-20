// UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
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
  joinDate: Timestamp.now(),
  phone: "",
  rating: 0.0,
  status: 'inactive',
  verified: false,
  bio: "",
  imageUrl: "https://fra.cloud.appwrite.io/v1/storage/buckets/6851ea670001286ca7ec/files/6851f24000040335c213/view?project=6851ea2a0006cdc67827",
  location: null
}

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(initUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = getDoc(doc(db, 'users', firebaseUser.uid));
        userData.then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as User;
            setUser({
              ...data,
              isAuthenticated: true,
            });
          }
        })
      } else {
        console.log('user signed out')
        setUser({ ...initUser, isAuthenticated: false })
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const useCredentials = await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.log('Error')
      error.message.includes('invalid-credential') ? toast.error("You have entered invalid login credentials") : toast.error("Login server error, please try again");
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      const userRef = doc(db, "users", userCredentials.user.uid)
      const userData = {
        ...initUser,
        uid: userCredentials.user.uid,
        displayName: name,
        isAuthenticated: true,
        emailVerified: userCredentials.user.emailVerified,
        joinDate: Timestamp.fromDate(new Date()),
        status: "active"
      }
      await setDoc(userRef, userData)
      setUser(userData)

    } catch(error){
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
    
  };

  const logout = async () => {
    setLoading(true)
    try{
      await signOut(auth)
    } catch(error){
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
  };

  const updateProfile = async (info: Partial<User>) => {
    const userRef = doc(db, 'users', user.uid)
    const resp = await updateDoc(userRef, {
      ...info
    })

    setUser({ ...user, ...info })
  };

  return (
    <UserContext.Provider value={{ ...user, login, logout, updateProfile, register, loading }}>
      {children}
    </UserContext.Provider>
  );
}

