import React, {useState} from 'react'
import { ToastAndroid, View, TextInput, Button,Image, ImageBackground,Text, TouchableOpacity, Alert } from 'react-native'
import styles from '../styles';

const SignUp = ({navigation}) => {
    
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[username, setUsername] = useState("");
    const[fullname, setFullname] = useState("");
    const[gender, setGender] = useState("");

    const register = () => {

    };
    

    return(
        <ImageBackground
        source={require('../images/loginbg.jpg')} 
            style={{ flex: 1,
              width: null,
              height: null,
              }}
        >
          <View style={styles.main}>   
              <View style={styles.inputcontainer}>
                  <TextInput style={styles.input} 
                  placeholder="Email"
                  placeholderTextColor="#ededed"
                  value={email} 
                  onChangeText={(text)=> setEmail(text)} 
                  >  
                  </TextInput>
  
                  <TextInput style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#ededed"
                  value={username} 
                  onChangeText={(text)=> setUsername(text)} 
                  >
                  </TextInput>
  
                  <TextInput style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#ededed"
                  secureTextEntry={true}
                  value={password} 
                  onChangeText={(text)=> setPassword(text)} 
                  >
                  </TextInput>
  
                  <TextInput style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#ededed"
                  value={fullname} 
                  onChangeText={(text)=> setFullname(text)} 
                  >
                  </TextInput>
  
                  <TextInput style={styles.input}
                  placeholder="Gender"
                  placeholderTextColor="#ededed"
                  value={gender} 
                  onChangeText={(text)=> setGender(text)} 
                  >
                  </TextInput>
  
              </View>
  
              <View style={styles.buttoncontainer}>
                <Button style={styles.Button}
                onPress={register} 
                title='Register'></Button> 
              </View>
          
          
          </View>   
        </ImageBackground>
      );
}

export default SignUp
