import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import colors from './constants/colors';
import CreateRequestScreen from './screens/CreateRequestScreen';
import CreateServiceScreen from './screens/CreateServiceScreen';
import Dashboard from './screens/Dashboard';
import DiscoverScreen from './screens/DiscoverScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProviderDetailsScreen from './screens/ProviderDetailsScreen';
import RequestDetailsScreen from './screens/RequestDetailsScreen';
import NotificationsScreen from './screens/NotificationScreen';
import PrivacySecurityScreen from './screens/PrivacyScreen';
import GuideScreen from './screens/GuideScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Toaster } from 'sonner-native';
import AuthGuard from './components/AuthGuard';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserProvider from './contexts/UserContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Discover') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          height: Platform.OS === 'ios' ? 80 : 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: Platform.OS === 'ios' ? 15 : 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
      <Stack.Screen name="MainTabs">
        {() => (
          <AuthGuard>
            <MainTabs />
          </AuthGuard>
        )}
      </Stack.Screen>

      <Stack.Screen name="ProviderDetails">
        {() => (
          <AuthGuard>
            <ProviderDetailsScreen />
          </AuthGuard>
        )}
      </Stack.Screen>

      <Stack.Screen name="RequestDetails">
        {() => (
          <AuthGuard>
            <RequestDetailsScreen />
          </AuthGuard>
        )}
      </Stack.Screen>

      <Stack.Screen name="CreateRequest">
        {() => (
          <AuthGuard>
            <CreateRequestScreen />
          </AuthGuard>
        )}
      </Stack.Screen>

      <Stack.Screen name="CreateService">
        {() => (
          <AuthGuard>
            <CreateServiceScreen />
          </AuthGuard>
        )}
      </Stack.Screen>

      <Stack.Screen name="EditProfile">
        {() => (
          <AuthGuard>
            <EditProfileScreen />
          </AuthGuard>
        )}
      </Stack.Screen>

      <Stack.Screen name="Notifications">
        {() => (
          <AuthGuard>
            <NotificationsScreen />
          </AuthGuard>
        )}
      </Stack.Screen>

      <Stack.Screen name="PrivacySecurity">
        {() => (
          <AuthGuard>
            <PrivacySecurityScreen />
          </AuthGuard>
        )}
      </Stack.Screen>

      <Stack.Screen name="Guide" component={GuideScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (


    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light"/>
        <NavigationContainer>
          <UserProvider>
            <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
              <AppStack />
              <Toaster />
            </SafeAreaView>
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