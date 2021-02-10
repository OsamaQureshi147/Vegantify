import React  from 'react' 
 import AsyncStorage from '@react-native-async-storage/async-storage';  
import {StyleSheet, View,TouchableOpacity,Text} from 'react-native';



clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }
 
}
 



const dashboard = ({navigation}) => {  

  const readData = async () => {
    try {
      var m="";
      m = await AsyncStorage.getItem('sp');
      if (m !== null) 
      { 
        
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
    
 
    
      <View style={styles.main}>   
  

          <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.signinButton}  >
              <Text style={styles.opacitytext}>Go to Map</Text>
          </TouchableOpacity>
          </View>
       
      
      </View>    
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
