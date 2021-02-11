import React  from 'react' 
import AsyncStorage from '@react-native-async-storage/async-storage';  
import {StyleSheet, View,TouchableOpacity,Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import findveg from './findveg';


clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }
 
}
 



const dashboard = ({navigation}) => {  

  const Drawer = createDrawerNavigator();
  const readData = async () => {
    try {
      var m="";
      m = await AsyncStorage.getItem('sp');
      if (m !== null) 
      { 
        console.log(m);
      }
      else
      {
        alert("Not Logged In");
        navigation.navigate("Login");
      }
  
    } catch (e) { 
       
    }
  }
  readData(); 
     
    return( 


      // <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Map" component={findveg} />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
      </Drawer.Navigator>
    // </NavigationContainer>
 
    
          // <View style={styles.main}>   
  

          // <View style={styles.buttoncontainer}>
          // <TouchableOpacity 
          // style={styles.signinButton}
          // onPress={()=> navigation.navigate("findveg")}
          // >
          //     <Text style={styles.opacitytext}>Go to Map</Text>
          // </TouchableOpacity>
          // </View>
       
      
        //  </View>    
      );
}





const styles = StyleSheet.create({
  main:{  
    justifyContent: 'center',
    alignItems: 'center'
  }, 
 

  signinButton:
  {
    backgroundColor: '#80c5d1',
    width: 200,
    padding: 10,
    marginTop: 120,  
    alignItems: 'center',
    borderRadius: 50,
  },
  opacitytext:
  { 
    fontSize:15, 
    color:'white'
  },

 
});




export default dashboard
