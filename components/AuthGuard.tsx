
import * as SecureStore from 'expo-secure-store'
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';



export default function AuthGuard({children}){
    const { loggedIn } = useUser();
    const navigation = useNavigation();
    const [token, setToken] = useState(null)

    if (!loggedIn || token){
        //@ts-ignore
        navigation.replace('Login');
    }

    //If authenticated return the children
    return (
        {children}
    )
}

