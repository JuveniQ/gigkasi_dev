import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Platform, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from './constants/colors'
import CreateRequestScreen from './screens/CreateRequestScreen'
import Dashboard from './screens/Dashboard'
import DiscoverScreen from './screens/DiscoverScreen'
import MessagesScreen from './screens/MessagesScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProviderDetailsScreen from './screens/ProviderDetailsScreen'
import RequestDetailsScreen from './screens/RequestDetailsScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import CreateServiceScreen from './screens/CreateServiceScreen'

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
          navigation.navigate('Home', { screen: tabRoutes[prevIndex] });
          setCurrentIndex(prevIndex);
        }
      } else {
        const nextIndex = Math.min(tabRoutes.length - 1, currentIndex + 1);
        if (nextIndex !== currentIndex) {
          navigation.navigate('Home', { screen: tabRoutes[nextIndex] });
          setCurrentIndex(nextIndex);
        }
      }
    }).minDistance(60)

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
      <View collapsable={false} style={{flex: 1}}>
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
          tabBarActiveTintColor: colors.tabBarColor,
          tabBarInactiveTintColor: colors.headerColor,
        })}>

          <Tab.Screen name='Dashboard' component={Dashboard} />
          <Tab.Screen name='Discover' component={DiscoverScreen} />
          <Stack.Screen name='Messages' component={MessagesScreen} />
          <Tab.Screen name='Profile' component={ProfileScreen} />
        </Tab.Navigator>
        </View>
    </GestureDetector>

  )
}


function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Home' component={MainTabs} />
      <Stack.Screen name='ProviderDetails' component={ProviderDetailsScreen} />
      <Stack.Screen name='RequestDetails' component={RequestDetailsScreen} />
      <Stack.Screen name='CreateRequest' component={CreateRequestScreen} />
      <Stack.Screen name='CreateService' component={CreateServiceScreen} />
      <Stack.Screen name='EditProfile' component={EditProfileScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <SafeAreaView style={[styles.container, Platform.OS == 'ios' ? { padding: StatusBar.currentHeight } : null]}>
          <StatusBar barStyle='dark-content'   />
          <RootStack />
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})