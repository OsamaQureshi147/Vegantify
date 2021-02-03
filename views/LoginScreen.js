import React, {useState} from 'react'
import { ToastAndroid, View, TextInput, Button,Image, ImageBackground,Text, TouchableOpacity, Alert } from 'react-native'
import styles from '../styles';


const LoginScreen = ({navigation}) => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    
    const signIn = () => {


    }

    return(
        <ImageBackground
        source={require('../images/loginbg.jpg')} 
            style={{ flex: 1,
              width: null,
              height: null,
              }}
        
        >
          <View style={styles.Imagecontainer}>
          <Image
          source={require('../images/appicon180.png')} 
          style={{
            height:100,
            width: 100, 
          }}
          ></Image>
          
        </View>
        <View style={styles.main}>   
            <View style={styles.inputcontainer}>
                <TextInput style={styles.input} 
                placeholder="Email" placeholderTextColor="white"
                autoFocus 
                type="email" 
                value={email} 
                onChangeText={(text)=> setEmail(text)} 
                />  
        
                <TextInput style={styles.input2}
                placeholder="Password" placeholderTextColor="white"
                secureTextEntry 
                type="password" 
                value={password} 
                onChangeText={(text)=>setPassword(text)} 
                />

            </View>
  
            <View style={styles.buttoncontainer}>
              <Button style={styles.Button}
              onPress={signIn} 
              title='Sign In'></Button> 
            </View>
            
            <View
            style={{marginTop: 10}}> 
              <TouchableOpacity onPress={()=> navigation.navigate("Register")}> 
              <Text 
              style={styles.text} 
              >Don't have an account yet? Sign Up 
             
              </Text>
              </TouchableOpacity>
            </View>
         
          
        </View>   
      </ImageBackground>
      );
}

export default LoginScreen;



