
import * as SecureStore from 'expo-secure-store'
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';



export default function AuthGuard({ children }){
    const user = useUser();
    const navigation = useNavigation();

    useEffect(()=>{
        if(!user.loading){
            if(!user.isAuthenticated){
                //@ts-ignore
                navigation.navigate({ name: 'Login', pop: true})
            } else {
                if(navigation.getId() === 'Login' || navigation.getId() === 'Register' || navigation.getId() === 'Guide' || navigation.getId() === 'Welcome' ){
                    //@ts-ignore
                    navigation.navigate({ name: 'MainTabs', pop: true})
                }
            }
        } 
    }, [user.isAuthenticated, user.loading])


    if (user.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

    //If authenticated return the children
    return user.isAuthenticated ? children : null

}

