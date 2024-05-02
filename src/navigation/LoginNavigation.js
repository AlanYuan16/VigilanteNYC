import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '..screens/GoogleLogin.js';

const Stack = createNativeStackNavigator();
return(
    <NavigationContainer>
        <Stack.Navigator initialRouteName= 'Login'>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
)
export default CustomStackNavigator;