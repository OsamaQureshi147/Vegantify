import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
var coche = '';

import Toast from 'react-native-simple-toast';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {ProgressBar, Colors} from 'react-native-paper';

// Disable yellow box warning messages
console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {reports: false};
    this.state = {
      loading: true,
      region: {
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      isMapReady: false,
      marginTop: 1,
      userLocation: '',
      regionChangeProgress: false,
    };
  }

  componentWillMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

        this.setState({
          reports: [
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            {
              latitude: position.coords.latitude + 0.0002,
              longitude: position.coords.longitude + 0.003,
            },
          ],
        });

        this.setState({
          region: region,
          loading: false,
          error: null,
        });
      },

      (error) => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false,
        });
      },
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 5000},
    );
  }

  onMapReady = () => {
    this.setState({isMapReady: true, marginTop: 0});
  };

  mapMarkers = () => {
    return this.state.reports.map((report) => (
      <Marker
        // key={report.id}
        coordinate={{latitude: report.latitude, longitude: report.longitude}}
        title="ji"
        // description={report.comments}
      ></Marker>
    ));
  };

  // Fetch location details as a JOSN from google map API
  fetchAddress = () => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        this.state.region.latitude +
        ',' +
        this.state.region.longitude +
        '&key=' +
        'AIzaSyAXW-WDp0MF5si6oFXaukDQuThTr1wqmDE',
    )
      .then((response) => response.json())
      .then((responseJson) => {
        const userLocation = responseJson.results[0].formatted_address;
        this.setState({
          userLocation: userLocation,
          regionChangeProgress: false,
        });
      });
  };

  renderProgressBar() {
    if (this.state.viewProgress) {
      return <ProgressBar color={'blue'} indeterminate={true} />;
    }
  }

  fetch_vegetrains = () => {
    Toast.show('pressed', Toast.SHORT);
    this.setState({viewProgress: true});
    //   fetch('https://zallary.com/vegantify/fetch_location.php', {
    //     method: 'POST',
    // }).then((response) => response.text())
    //   .then((text) => {
    //     console.log(text);
    //      })
    //      .catch((error) => {
    //       console.error(error);
    //    });
  };

  // Update state on region change
  onRegionChange = (region) => {
    this.setState(
      {
        region,
        regionChangeProgress: true,
      },
      () => this.fetchAddress(),
    );
  };

  // Action to be taken after select location button click
  onLocationSelect = () => alert(this.state.userLocation);

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <SafeAreaView>
          <View style={styles.container}>
            {this.renderProgressBar()}
            <View style={{flex: 2}}>
              {!!this.state.region.latitude && !!this.state.region.longitude && (
                <MapView
                  style={{...styles.map, marginTop: this.state.marginTop}}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={this.state.region}
                  showsUserLocation={true}
                  onMapReady={this.onMapReady}
                  onRegionChangeComplete={this.onRegionChange}>
                  {this.mapMarkers()}

                  {/* <MapView.Marker
                  coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                  title={"Your Location"}
                  draggable
                /> */}
                  {/* <View   style={styles.search} >
                </View> */}
                </MapView>
              )}
              <View
                style={{
                  width: '100%',
                  marginBottom: 100,
                  position: 'absolute', //Here is the trick
                  bottom: 0, //Here is the trick
                }}>
                <TouchableOpacity
                  style={{
                    width: '40%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '30%',
                    marginRight: '30%',
                    position: 'absolute', //Here is the trick
                    bottom: 0, //Here is the trick
                    backgroundColor: '#cfcfcf',
                    opacity: 0.7,
                    padding: 10,
                    alignItems: 'center',
                    borderRadius: 50,
                  }}
                  onPress={this.fetch_vegetrains}>
                  <Text>Search Vegetrains</Text>
                </TouchableOpacity>
              </View>

              {/* <View style={styles.mapMarkerContainer}>
              <Text style={{  fontSize: 42, color: "#ad1f1f" }}>&#xf041;</Text>
            </View> */}
            </View>
            {/* <View style={styles.deatilSection}>
            <Text style={{ fontSize: 16, fontWeight: "bold",  marginBottom: 20 }}>Move map for location</Text>
            <Text style={{ fontSize: 10, color: "#999" }}>LOCATION</Text>
            <Text numberOfLines={2} style={{ fontSize: 14, paddingVertical: 10, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
              {!this.state.regionChangeProgress ? this.state.userLocation : "Identifying Location..."}</Text>
            <View style={styles.btnContainer}>
              <Button
                title="PICK THIS LOCATION"
                disabled={this.state.regionChangeProgress}
                onPress={this.onLocationSelect}
              >
              </Button>
            </View>
          </View> */}
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  search: {
    width: '100%',
    height: 50,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  map: {
    flex: 1,
  },
  mapMarkerContainer: {
    left: '47%',
    position: 'absolute',
    top: '42%',
  },
  mapMarker: {
    fontSize: 40,
    color: 'red',
  },
  deatilSection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 30,
    marginStart: 10,
    marginTop: 18,
    color: 'white',
  },
  btnContainer: {
    width: Dimensions.get('window').width - 20,
    position: 'absolute',
    bottom: 100,
    left: 10,
  },
});
