import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
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
import AuthScreen from './screens/AuthScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen'

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

  return (
    <GestureDetector gesture={switchTab}>
      <View collapsable={false} style={{ flex: 1 }}>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: (props) => tabIcon(props, route),
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0
          },
          animation: 'shift',
          tabBarHideOnKeyboard: true,
          lazy: true,
          tabBarActiveTintColor: colors.support,
          tabBarInactiveTintColor: colors.main,

        })}>

          <Tab.Screen name='Dashboard' component={Dashboard} listeners={{
            tabPress: (e) => {
              setCurrentIndex(0)
            }
          }} />
          <Tab.Screen name='Discover' component={DiscoverScreen} listeners={{
            tabPress: (e) => {
              setCurrentIndex(1)
            }
          }} />
          <Stack.Screen name='Messages' component={MessagesScreen} listeners={{
            tabPress: (e) => {
              setCurrentIndex(2)
            }
          }} />
          <Tab.Screen name='Profile' component={ProfileScreen} listeners={{
            tabPress: (e) => {
              setCurrentIndex(3)
            }
          }} />
        </Tab.Navigator>
      </View>
    </GestureDetector>

  )
}


function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Welcome' component={WelcomeScreen}/>
      <Stack.Screen name="Guide" component={GuideScreen}/>
      <Stack.Screen name='MainTabs' component={MainTabs} />
      <Stack.Screen name='ProviderDetails' component={ProviderDetailsScreen} />
      <Stack.Screen name='RequestDetails' component={RequestDetailsScreen} />
      <Stack.Screen name='CreateRequest' component={CreateRequestScreen} />
      <Stack.Screen name='CreateService' component={CreateServiceScreen} />
      <Stack.Screen name='EditProfile' component={EditProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name='PrivacySecurity' component={PrivacySecurityScreen} />
      
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

export default function App() {


  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <SafeAreaView style={[styles.container, Platform.OS == 'ios' ? { padding: StatusBar.currentHeight } : null]}>
            <StatusBar barStyle='light-content' />
            <RootStack />
          </SafeAreaView>
        </NavigationContainer>
      </GestureHandlerRootView>
    </UserProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginBottom: 48,
  }
})