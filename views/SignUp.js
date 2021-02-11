import React, {useState} from 'react'
import { ToastAndroid, View, TextInput, ImageBackground,Text, TouchableOpacity, Alert } from 'react-native'
import styles from '../styles';
import RadioForm  from 'react-native-simple-radio-button';

const SignUp = ({navigation}) => {
    
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirm_password, setConfirmPassword] = useState("");
    const[username, setUsername] = useState("");
    const[fullname, setFullname] = useState("");
    const[gender, setGender] = useState("male");


    const radioProps = [
      { label: 'male', value: true },
      { label: 'female', value: false },
    ];


    const register = () => {
      var e_mail = email;
      var code = password;
      var uname = username;
      var full_name = fullname; 
      var sex = gender;

      if(uname != "" || code != "" || username != "" ||  fullname != "")
      { 
          fetch('https://zallary.com/vegantify/signup.php', {
              method: 'POST', 
              body: JSON.stringify({
                  email: e_mail,
                  password: code,
                  username: uname,
                  gender: sex,
                  fullname: full_name

              })
          }).then((response) => response.text())
          .then((text) => { 
      
          if(text.includes('Register Successfully'))
          {
              if (Platform.OS === 'android') 
                {
                  //Navigate to next page 
                  //Registration successfull
                ToastAndroid.show(text , ToastAndroid.SHORT); 
                navigation.navigate("Login");
                
                }
              else 
                  {
                    Alert.alert(text);
                    navigation.navigate("Login")
                  } 
          }
              else
              {

                 if (Platform.OS === 'android') 
                {
                ToastAndroid.show(text , ToastAndroid.SHORT); 
                }
              else 
                  {
                    Alert.alert(text);
                  } 
                 
              } 
          });
          }
          else
          { 
          if (Platform.OS === 'android') 
          {
              ToastAndroid.show("All fields are required" , ToastAndroid.SHORT); 
          }
          else 
          {
              Alert.alert("All fields are required");
          }

          }
    };

    const setGenderRadio = (label) => {
      if (label){
        setGender("male");
      }
      else {
        setGender("female");
      }
    }
    

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
                  placeholder="Full Name"
                  placeholderTextColor="#ededed" 
                  value={fullname} 
                  onChangeText={(text)=> setFullname(text)} 
                  >
                  </TextInput>

                  <TextInput style={styles.input} 
                  placeholder="Email"
                  placeholderTextColor="#ededed"
                  value={email}
                  autoCapitalize='none'
                  onChangeText={(text)=> setEmail(text)} 
                  >  
                  </TextInput>
  
                  <TextInput style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#ededed"
                  value={username} 
                  autoCapitalize='none'
                  onChangeText={(text)=> setUsername(text)} 
                  >
                  </TextInput>


                  <View
                  style={styles.radiobutton}
                  >
                    <Text style={{paddingTop:20, color: 'white', fontSize: 17}}
                    >Gender: </Text>
                      <RadioForm 
                        buttonSize={12}
                        radioStyle={{paddingTop:25,
                        marginLeft:20 }}
                        selectedButtonColor="black"
                        formHorizontal={true}
                        labelHorizontal={true}
                        radio_props={radioProps} 
                        onPress={(value) => setGenderRadio(value)}
                        animation={true} 
                        buttonWrapStyle={{marginLeft: 300}}
                      />
                    </View>
  
                  <TextInput style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#ededed"
                  secureTextEntry={true}
                  value={password} 
                  autoCapitalize='none'
                  onChangeText={(text)=> setPassword(text)} 
                  >
                  </TextInput>

                  <TextInput style={styles.input}
                  placeholder="Confirm password"
                  placeholderTextColor="#ededed"
                  secureTextEntry={true}
                  autoCapitalize='none'
                  value={confirm_password} 
                  onChangeText={(text)=> setConfirmPassword(text)} 
                  >
                  </TextInput>

  
                  

                 
  
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
