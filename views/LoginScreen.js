import React, {useState} from 'react'
import { ToastAndroid, View, TextInput, Button,Image, ImageBackground,Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import styles from '../styles';


var coche="";

const LoginScreen = ({navigation}) => {

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    
 //    ----------------------------------------------   //

    const signIn = () => {
   
        var uname = email;
        var code = password;


        if(uname != "" || code != ""){ 
            fetch('https://zallary.com/vegantify/log_in.php', {
                method: 'POST', 
                body: JSON.stringify({
                    email: uname,
                    password: code
                })
            }).then((response) => response.text())
            .then((text) => { 
        
            if(text.includes('Wrong_Credentials'))
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
            
            else
            {
                coche = JSON.parse(text); 
                if (Platform.OS === 'android'){
                    ToastAndroid.show("login successfull: "+coche['fullname'] , ToastAndroid.SHORT); 
                }
                else{
                    Alert.alert("login successfull: "+coche['fullname']); 
                }
                navigation.navigate("dashboard");
            } 
            });



            }
            else
            { 
            if (Platform.OS === 'android') 
            {
                ToastAndroid.show("Email/Password Can't be empty" , ToastAndroid.SHORT); 
            }
            else 
            {
                Alert.alert("Email/Password Can't be empty");
            }

            }
    }
 //    ----------------------------------------------   //




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
                <TouchableOpacity style={styles.signinButton} onPress= {signIn}>
                    <Text style={styles.opacitytext}>Sign In</Text>
                </TouchableOpacity>
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



