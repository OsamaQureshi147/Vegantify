import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './views/LoginScreen';
import SignUp from './views/SignUp';


const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: "blue"},
  headerTitleStyle: {color: "white"},
  headerTintColor: "white",
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions= {globalScreenOptions}>
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Register' component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App