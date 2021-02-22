import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native';
import {BarIndicator} from 'react-native-indicators';

var coche = '';
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('sp', value);
  } catch (e) {
    // saving error
  }
};
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //    ----------------------------------------------   //

  const readData = async () => {
    try {
      var m = '';
      m = await AsyncStorage.getItem('sp');
      if (m !== null) {
        navigation.replace('dashboard');
      } else {
      }
    } catch (e) {}
  };
  readData();

  const signIn = () => {
    var uname = email;
    var code = password;

    if (uname != '' || code != '') {
      setLoading(true);
      fetch('https://zallary.com/vegantify/log_in.php', {
        method: 'POST',
        body: JSON.stringify({
          email: uname,
          password: code,
        }),
      })
        .then((response) => response.text())
        .then((text) => {
          setLoading(false);

          if (text.includes('Wrong_Credentials')) {
            Toast.show(text, Toast.SHORT);
          } else {
            storeData(text);
            navigation.replace('dashboard');
          }
        });
    } else {
      Toast.show("Email/Password Can't be empty", Toast.SHORT);
    }
  };
  //    ----------------------------------------------   //

  return (
    <ImageBackground
      source={require('../images/loginbg.jpg')}
      style={{flex: 1, width: null, height: null}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.containers}>
          {loading ? (
            <BarIndicator
              color="white"
              animationDuration={800}
              count={4}
              size={30}
            />
          ) : (
            <>
              <View style={styles.Imagecontainer}>
                <Image
                  source={require('../images/appicon180.png')}
                  style={{
                    height: 100,
                    width: 100,
                  }}></Image>
              </View>
              <View style={styles.main}>
                <View style={styles.inputcontainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="white"
                    autoFocus
                    type="email"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />

                  <TextInput
                    style={styles.input2}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry
                    type="password"
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>

                <View style={styles.buttoncontainer}>
                  <TouchableOpacity
                    style={styles.signinButton}
                    onPress={signIn}>
                    <Text style={styles.opacitytext}>Sign In</Text>
                  </TouchableOpacity>
                </View>

                <View style={{marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.text}>
                      Don't have an account yet? Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;
