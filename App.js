import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import colors from './constants/colors'
import CreateRequestScreen from './screens/CreateRequestScreen'
import CreateServiceScreen from './screens/CreateServiceScreen'
import Dashboard from './screens/Dashboard'
import DiscoverScreen from './screens/DiscoverScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import MessagesScreen from './screens/MessagesScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProviderDetailsScreen from './screens/ProviderDetailsScreen'
import RequestDetailsScreen from './screens/RequestDetailsScreen'
import NotificationsScreen from './screens/NotificationScreen'
import PrivacySecurityScreen from './screens/PrivacyScreen'
import UserProvider from './contexts/UserContext'
import GuideScreen from './screens/GuideScreen'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen'
import AuthGuard from './components/AuthGuard'
import { Toaster } from 'sonner-native'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  const navigation = useNavigation();
  const tabRoutes = ['Dashboard', 'Discover', 'Messages', 'Profile'];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const switchTab = Gesture.Pan()
    .onStart(({ velocityX }) => {
      if (velocityX > 0) {
        const prevIndex = Math.max(0, currentIndex - 1);
        if (prevIndex !== currentIndex) {
          navigation.navigate('MainTabs', { screen: tabRoutes[prevIndex] });
          setCurrentIndex(prevIndex);
        }
      } else if (velocityX < 0) {
        const nextIndex = Math.min(tabRoutes.length - 1, currentIndex + 1);
        if (nextIndex !== currentIndex) {
          navigation.navigate('MainTabs', { screen: tabRoutes[nextIndex] });
          setCurrentIndex(nextIndex);
        }
      }
    }).minDistance(100)

  const tabIcon = ({ color, size }, route) => {
    const iconMap = {
      Dashboard: "home",
      Discover: 'search-circle',
      Messages: 'chatbubble',
      Profile: 'person'
    }
    const iconName = iconMap[route.name]
    return <Ionicons name={iconName} size={size} color={color} />
  }

  
}


function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='MainTabs'>
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
      <Stack.Screen name="Guide" component={GuideScreen} />
      <Stack.Screen name="MainTabs" component={() => (
        <AuthGuard><MainTabs /></AuthGuard>
      )} />
      <Stack.Screen name="ProviderDetails" component={() => (
        <AuthGuard><ProviderDetailsScreen /></AuthGuard>
      )} />
      <Stack.Screen name="RequestDetails" component={() => (
        <AuthGuard><RequestDetailsScreen /></AuthGuard>
      )} />
      <Stack.Screen name="CreateRequest" component={() => (
        <AuthGuard><CreateRequestScreen /></AuthGuard>
      )} />
      <Stack.Screen name="CreateService" component={() => (
        <AuthGuard><CreateServiceScreen /></AuthGuard>
      )} />
      <Stack.Screen name="EditProfile" component={() => (
        <AuthGuard><EditProfileScreen /></AuthGuard>
      )} />
      <Stack.Screen name="Notifications" component={() => (
        <AuthGuard><NotificationsScreen /></AuthGuard>
      )} />
      <Stack.Screen name="PrivacySecurity" component={() => (
        <AuthGuard><PrivacySecurityScreen /></AuthGuard>
      )} />


      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default function App() {


  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1, marginBottom: 0 }}>
        <SafeAreaProvider styles={styles.container}>
          <StatusBar style='light' backgroundColor={colors.main} />
          <NavigationContainer>

            <View style={[styles.container, Platform.OS == 'ios' ? { padding: StatusBar.currentHeight } : null]}>
              
              <RootStack />
              <Toaster />
            </View>
          </NavigationContainer>

        </SafeAreaProvider>
      </GestureHandlerRootView>
    </UserProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
    marginBottom: 0,
    paddingTop: 10

  }
})