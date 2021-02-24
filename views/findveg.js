import React, {Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
console.disableYellowBox = true;
var lat_ = '',
  long_ = '';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTheThing: false,
      reports: false,
    };
    this.state = {
      email: '',
      fname: '',
      username: '',
    };

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

  componentDidMount = () => {
    this.readData();
    Geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

        //  Toast.show(position.coords.latitude+"",Toast.SHORT);

        this.setState({
          showTheThing: false,
          reports: [
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
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
    this.live_location();
  };
  live_location() {
    Geolocation.watchPosition(
      (lastposition) => {
        console.log(lastposition.coords);

        (lat_ = lastposition.coords.latitude),
          (long_ = lastposition.coords.longitude),
          fetch('https://zallary.com/vegantify/update_location.php', {
            method: 'POST',
            body: JSON.stringify({
              lat: lastposition.coords.latitude,
              long: lastposition.coords.longitude,
              email: email,
              username: username,
              name: fname,
            }),
          })
            .then((response) => response.text())
            .then((text) => {
              Toast.show(text, Toast.SHORT);
            });
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 5000,
        distanceFilter: 10,
      },
    );
  }

  readData = async () => {
    try {
      var m = '';
      m = await AsyncStorage.getItem('sp');
      if (m !== null) {
        let obj = JSON.parse(m);
        email = obj[0].email;
        fname = obj[0].fullname;
        username = obj[0].username;
        console.log(fullname);
      } else {
        alert('Not Logged In');
        navigation.navigate('Login');
      }
    } catch (e) {}
  };

  //.................................................
  onMapReady = () => {
    this.setState({isMapReady: true, marginTop: 0});
  };

  // Fetch location details as a JOSN from google map API
  // fetchAddress = () => {
  //   fetch(
  //     'https://maps.googleapis.com/maps/api/geocode/json?address=' +
  //       this.state.region.latitude +
  //       ',' +
  //       this.state.region.longitude +
  //       '&key=' +
  //       'AIzaSyAXW-WDp0MF5si6oFXaukDQuThTr1wqmDE',
  //   )
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       const userLocation = responseJson.results[0].formatted_address;
  //       this.setState({
  //         userLocation: userLocation,
  //         regionChangeProgress: false,
  //       });
  //     });
  // };

  // this funtion shows the popup of nearby people
  show_nearby = (obj) => {
    let name_arr = [];
    let distance_arr = [];
    for (let i = 0; i < obj.length; i++) {
      name_arr.push(obj[i].name);
      distance_arr.push(obj[i].distance);
    }
    Alert.alert(name_arr);
  };

  fetch_vegetrains = () => {
    this.setState({viewProgress: true});
    fetch('https://zallary.com/vegantify/fetch_location.php', {
      method: 'POST',
      body: JSON.stringify({
        latitude: lat_,
        longitude: long_,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((jsonresponse) => {
        this.setState({viewProgress: false});
        if (JSON.stringify(jsonresponse).includes('No')) {
          Toast.show(JSON.stringify(jsonresponse), Toast.SHORT);
        } else {
          this.setState({
            showTheThing: true,
            reports: jsonresponse,
          });
        }
        show_nearby(jsonresponse);
        console.log(jsonresponse);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Update state on region change
  onRegionChange = (region) => {
    this.setState(
      {
        region,
        regionChangeProgress: true,
      },
      //,() => this.fetchAddress(),
    );
  };

  // Action to be taken after select location button click
  onLocationSelect = () => alert(this.state.userLocation);

  mapMarkers = () => {
    return (
      this.state.showTheThing &&
      this.state.reports.map((report) => (
        <Marker
          key={report.username}
          coordinate={{
            latitude: parseFloat(report.latitude),
            longitude: parseFloat(report.longitude),
          }}
          title={report.name}
          description={
            'Email: ' +
            report.email +
            ', Distance: ' +
            (parseFloat(report.distance) / 0.62137).toFixed(2) +
            ' km'
          }></Marker>
      ))
    );
  };

  renderProgressBar() {
    if (this.state.viewProgress) {
      return <ProgressBar color="#1b95e0" indeterminate={true} />;
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{flex: 1}}>
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
                    backgroundColor: '#bababa',
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
