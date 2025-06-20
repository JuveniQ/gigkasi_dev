import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/LoginScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import GuideScreen from "../../screens/GuideScreen";
import WelcomeScreen from "../../screens/WelcomeScreen";


const Stack = createNativeStackNavigator()



export default function AuthNavigator(){


    return(
        <Stack.Navigator id={undefined} screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Guide" component={GuideScreen} />
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
    )
}