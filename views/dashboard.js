import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import settings from './settings.js';

clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
};
const dashboard = ({navigation}) => {
  const readData = async () => {
    try {
      var m = '';
      m = await AsyncStorage.getItem('sp');
      if (m !== null) {
        console.log(m);
      } else {
        alert('Not Logged In');
        navigation.navigate('Login');
      }
    } catch (e) {}
  };
  readData();

  const signout = () => {
    alert('Logout');
    clearAll();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.main}>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={styles.signinButton}
            onPress={() => navigation.navigate('findveg')}>
            <Text style={styles.opacitytext}>Go to Map</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: '#c7c8c9',
          borderBottomWidth: 1.2,
          marginLeft: 15,
          marginRight: 15,
        }}
      />

      <View style={styles.footer}>
        <TouchableOpacity>
          <View style={styles.footerdivision}>
            <Image
              style={styles.icons}
              source={require('../images/profileIcon.jpeg')}></Image>
            <Text>Profile</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('settings')}>
          <View style={styles.footerdivision}>
            <Image
              style={styles.icons}
              source={require('../images/settingsIcon.jpeg')}></Image>
            <Text>Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={signout}>
          <View style={styles.footerdivision}>
            <Image
              style={styles.icons}
              source={require('../images/logoutIcon.jpeg')}></Image>
            <Text>Logout</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.footerdivision}>
            <Image
              style={styles.icons}
              source={require('../images/aboutusIcon.jpeg')}></Image>
            <Text>About Us</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signinButton: {
    backgroundColor: '#80c5d1',
    borderWidth: 2,
    borderColor: 'black',
    width: 200,
    padding: 10,
    marginTop: 120,
    alignItems: 'center',
    borderRadius: 50,
  },
  opacitytext: {
    fontSize: 15,
    color: 'white',
  },

  footer: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },

  footerdivision: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icons: {
    height: 30,
    width: 30,
    marginBottom: 5,
    justifyContent: 'center',
  },
});
export default dashboard;
