import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-simple-toast';

const settings = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const changepwd = () => {
    if (new_password != confirm_password) {
      Toast.show("Passwords didn't match", Toast.SHORT);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView style={styles.inputcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="black"
          value={password}
          onChangeText={(text) => setPassword(text)}></TextInput>

        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="black"
          value={new_password}
          autoCapitalize="none"
          onChangeText={(text) => setNewPassword(text)}></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
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
