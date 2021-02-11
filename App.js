import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './views/LoginScreen';
import SignUp from './views/SignUp';
import dashboard from './views/dashboard'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Register' component={SignUp}/>
        <Stack.Screen name='dashboard' component={dashboard}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App