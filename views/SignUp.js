import React, {useState} from 'react'
import { ToastAndroid, View, TextInput, Button,Image, ImageBackground,Text, TouchableOpacity, Alert } from 'react-native'
import styles from '../styles';
import { RadioButton } from 'react-native-paper';

const SignUp = ({navigation}) => {
    
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[username, setUsername] = useState("");
    const[fullname, setFullname] = useState("");
    const[gender, setGender] = useState("");

    const register = () => {
      // ToastAndroid.show("Hello",ToastAndroid.SHORT);
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

                  <View>
                  <RadioButton
                  value="first"
                  status={ gender === 'first' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('first')}
                  />
                  </View>
                  {/* <TextInput style={styles.input}
                  placeholder="Gender"
                  placeholderTextColor="#ededed"
                  value={gender} 
                  onChangeText={(text)=> setGender(text)} 
                  >
                  </TextInput> */}
  
              </View>
              
              <View style={styles.buttoncontainer}>
                <TouchableOpacity style={styles.signinButton} onPress= {register}>
                    <Text style={styles.opacitytext}>Register</Text>
                </TouchableOpacity>
              </View>
          
          </View>   
        </ImageBackground>
      );
}

export default SignUp
