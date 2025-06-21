import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import colors from './constants/colors';
import { Toaster } from 'sonner-native';
import UserProvider, { useUser } from './contexts/UserContext';
import AuthNavigator from './components/Navigators/AuthNavigator';
import AppNavigator from './components/Navigators/AppNavigator';
import { DataProvider } from './contexts/DataContext';


Stack = createNativeStackNavigator()

function RootStack() {
  const { loading, isAuthenticated } = useUser()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={colors.accentLight} />
      </View>
    )
  }

  return (
    <>
      {isAuthenticated ?
        <AppNavigator /> :
        <AuthNavigator />
      }
    </>
  )
}


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <UserProvider>
            <DataProvider>
              <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
                <RootStack />
                <Toaster closeButton={true} position='top-center' gap={5} richColors />
              </SafeAreaView>
            </DataProvider>
          </UserProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    marginBottom: Platform.OS === 'ios' ? 0 : 0,
    marginBottom: Platform.OS === 'android' ? 32 : 0
  },
});