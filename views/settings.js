import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const settings = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [e_mail, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const signout = () => {
    alert('Password changed successfully!');
    clearAll();
    navigation.replace('Login');
  };
  const readData = async () => {
    try {
      var m = '';
      m = await AsyncStorage.getItem('sp');
      if (m !== null) {
        let obj = JSON.parse(m);
        setEmail(obj[0].email);
        fname = obj[0].fullname;
        username = obj[0].username;
        console.log(fullname);
      } else {
        alert('Unable to find email');
        // navigation.navigate('Login');
      }
    } catch (e) {}
  };

  readData();
  const changepwd = () => {
    if (new_password)
      if (new_password != confirm_password) {
        Toast.show("Passwords didn't match", Toast.SHORT);
      } else {
        setLoading(true);
        fetch('https://zallary.com/vegantify/change_password.php', {
          method: 'POST',
          body: JSON.stringify({
            email: e_mail,
            old_password: password,
            new_password: new_password,
          }),
        })
          .then((response) => response.text())
          .then((text) => {
            setLoading(false);
            if (text.includes('Password changed successfully')) {
              signout();
              storeData(text);
            } else {
              Toast.show(text, Toast.SHORT);
            }
          });
      }
  };

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}></TextInput>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="black"
          secureTextEntry
          value={new_password}
          autoCapitalize="none"
          onChangeText={(text) => setNewPassword(text)}></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor="black"
          value={confirm_password}
          autoCapitalize="none"
          onChangeText={(text) => setConfirmPassword(text)}></TextInput>

        <TouchableOpacity onPress={changepwd} style={styles.signinButton}>
          <Text style={styles.opacitytext}>Change Password</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },

  inputcontainer: {
    top: '30%',
    flexDirection: 'column',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  input: {
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {},
    }),
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    paddingStart: 10,
    paddingEnd: 10,
    borderColor: 'white',
    borderRadius: 100 / 2,
    borderWidth: 0.7,
    maxHeight: 45,
    marginBottom: 15,
    borderColor: 'black',
  },

  opacitytext: {
    fontSize: 15,
    color: 'white',
  },

  signinButton: {
    backgroundColor: '#3a40e0',
    width: 200,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 50,
    alignSelf: 'center',
  },
});
