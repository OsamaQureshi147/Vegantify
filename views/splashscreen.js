import React from 'react';
import {View, ImageBackground, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BarIndicator} from 'react-native-indicators';

const splashscreen = ({navigation}) => {
  const readData = async () => {
    try {
      var m = '';
      m = await AsyncStorage.getItem('sp');
      if (m !== null) {
        this.timeoutHandle = setTimeout(() => {
          // Add your logic for the transition

          navigation.replace('dashboard');
        }, 1500);
      } else {
        this.timeoutHandle = setTimeout(() => {
          // Add your logic for the transition

          navigation.navigate('Login');
        }, 1500);
      }
    } catch (e) {
      console.log(e);
    }
  };
  readData();

  return (
    <ImageBackground
      source={require('../images/loginbg.jpg')}
      style={{flex: 1, width: null, height: null}}>
      <View style={{marginTop: '80%'}}>
        <View style={styles.Imagecontainer}>
          <Image
            source={require('../images/appicon180.png')}
            style={{
              height: 170,
              width: 170,
            }}></Image>
          <View style={{marginTop: '10%'}}>
            <BarIndicator
              color="white"
              animationDuration={800}
              count={4}
              size={30}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default splashscreen;

const styles = StyleSheet.create({
  Imagecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
