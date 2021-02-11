import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React from 'react' ;
import {StyleSheet} from 'react-native';


export default () => (
  //  <SafeAreaView>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
      <Marker
        coordinate={{
          latitude: 37.78825,
         longitude: -122.4324,
        }}
      />

     </MapView>
);
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      height: "100%",
      width: "98%",
      ...StyleSheet.absoluteFillObject,
    },
   }); 