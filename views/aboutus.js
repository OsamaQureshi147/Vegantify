import React from 'react';
import {View, ImageBackground, StyleSheet, Image} from 'react-native';

const aboutus = () => {
  return (
    <ImageBackground
      source={require('../images/loginbg.jpg')}
      style={{flex: 1, width: null, height: null}}>
      <View style={styles.Imagecontainer}>
        <Image
          source={require('../images/appicon180.png')}
          style={{
            height: 100,
            width: 100,
          }}></Image>
      </View>
    </ImageBackground>
  );
};

export default aboutus;

const styles = StyleSheet.create({
  Imagecontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
