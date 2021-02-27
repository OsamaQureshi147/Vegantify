// import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator, Header} from '@react-navigation/stack';
import LoginScreen from './views/LoginScreen';
import SignUp from './views/SignUp';
import dashboard from './views/dashboard';
import findveg from './views/findveg';
import settings from './views/settings';
import aboutus from './views/aboutus';
import splashscreen from './views/splashscreen';

const Stack = createStackNavigator();
const AuthContext = React.createContext();

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('sp');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={splashscreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen name="Login" component={routing} />
          ) : (
            <Stack.Screen name="dashboard" component={routing} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

function routing({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="dashboard" component={dashboard} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="findveg" component={findveg} />
      <Stack.Screen name="settings" component={settings} />
      <Stack.Screen name="aboutus" component={aboutus} />
    </Stack.Navigator>
  );
}

export default App;
