import React  from 'react' 
import AsyncStorage from '@react-native-async-storage/async-storage';  
import {StyleSheet, View} from 'react-native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import findveg from './findveg';
import settings from './settings';


clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }
 
}


const logout = () => {
  return(
    <View></View>
    // Handle the logout function here
  );
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


      <NavigationContainer independent= {true}>
        <Drawer.Navigator  
          drawerPosition="right" 
          initialRouteName="Home"
          drawerContentOptions={{
            activeTintColor: 'red',
            itemStyle: { marginVertical: 10 },
            backgroundColor: "#a1eeff",
          }}
            overlayColor="transparent"
            drawerStyle={{
              width: '65%',
              backgroundColor: 'transparent',
              marginRight: -30,
            }}
          >
          
          <Drawer.Screen options={{
            title: 'Explore',
            headerRight: () => (
              <Icon.Button name= "ios-menu" size={25} 
              backgroundColor = "blue" options = {()=>{navigation.openDrawer()}}
              />
            )
          }} name="Explore" component={findveg} />
          <Drawer.Screen name="Settings" component={settings} />
          
        <Drawer.Screen name="Logout" component={logout} />
      </Drawer.Navigator>
     </NavigationContainer>
 
    
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
