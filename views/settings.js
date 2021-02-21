import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const settings = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.main}>
        <Text>Hello</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerdivision}>
          <Text>Home</Text>
        </View>

        <View style={styles.footerdivision}>
          <Text>Settings</Text>
        </View>

        <View style={styles.footerdivision}>
          <Text>Logout</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default settings;

const styles = StyleSheet.create({
  main: {
    flex: 12,
    backgroundColor: 'blue',
  },

  footer: {
    flex: 1,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },

  footerdivision: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
