import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Platform, StatusBar , StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Dashboard from './screens/Dashboard'
import HomeScreen from './screens/HomeScreen'
import DiscoverScreen from './screens/DiscoverScreen'
import ProfileScreen from './screens/ProfileScreen'
import ProviderDetailsScreen from './screens/ProviderDetailsScreen'
import RequestDetailsScreen from './screens/RequestDetailsScreen'
import MessagesScreen from './screens/MessagesScreen'
import { Ionicons } from '@expo/vector-icons'
import { colors } from './constants/colors'
import CreateRequestScreen from './screens/CreateRequestScreen'

const Stack = createNativeStackNavigator() 
const Tab = createBottomTabNavigator()

function MainTabs(){

  const tabBarIcon = (name) => {
    let icon = ''
    if(name == 'Dashboard'){
      icon = 'Dashboard';
    }

    return(
      <Ionicons name={icon}/>
  )
  }

  return(
    <Tab.Navigator screenOptions={({ route })=>({tabBarIcon:({active,color, size })=>{
      let iconName;
      if(route.name=='Dashboard'){
        iconName = 'home'
      } else if (route.name=='Discover'){
        iconName = 'search-circle'
      } else if (route.name=='Messages'){
        iconName = 'chatbubble'
      } else if (route.name=='Profile'){
        iconName='person'
      }

      return <Ionicons name={iconName} size={size} color={color}/>
    } ,headerShown: false, animation: 'shift', lazy: true, tabBarActiveTintColor: colors.tabBarColor, tabBarInactiveTintColor: colors.headerColor})}>
      <Tab.Screen name='Dashboard' component={Dashboard} />
      <Tab.Screen name='Discover' component={DiscoverScreen} />
      <Stack.Screen name='Messages' component={MessagesScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  )
}


function RootStack(){
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Home' component={MainTabs}/>
      <Stack.Screen name='ProviderDetails' component={ProviderDetailsScreen}/>
      <Stack.Screen name='RequestDetails' component={RequestDetailsScreen}/>
      <Stack.Screen name='CreateRequest' component={CreateRequestScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      
      <SafeAreaView style={[styles.container, Platform.OS == 'ios' ? {padding: StatusBar.currentHeight}: null]}>
          <StatusBar barStyle='light-content' backgroundColor={colors.headerColor} networkActivityIndicatorVisible={true}/>
          <RootStack/>  
      </SafeAreaView>
      
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})