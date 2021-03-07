import React, {useState} from 'react';
import {
  View,
  TextInput,
  ImageBackground,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from '../styles';
import RadioForm from 'react-native-simple-radio-button';
import Toast from 'react-native-simple-toast';
import {BarIndicator} from 'react-native-indicators';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [gender, setGender] = useState('male');
  const [loading, setLoading] = useState(false);

  const radioProps = [
    {
      label: <Text style={{color: '#FFFFFF'}}>{'male'}</Text>,
      value: true,
    },
    {
      label: <Text style={{color: '#FFFFFF'}}>{'female'}</Text>,
      value: false,
    },
  ];

  const register = () => {
    var e_mail = email;
    var code = password; 
    var confirm_code = confirm_password;
    var uname = username;
    var full_name = fullname;
    var sex = gender;
    // if(code =="")
    // {
    //   Alert.alert("empty");
    // }


    if(uname == "" || code=="" ||  confirm_code =="" ||  full_name =="" || e_mail =="")
    { 
      Toast.show("All Fields are required",Toast.show); 
    }
    else
    {
      if (code != confirm_code) 
      {
        Toast.show("Passwords didn't match", Toast.SHORT);
        // Alert.alert(code);
      }
      else
      { 
        setLoading(true);
        fetch('https://zallary.com/vegantify/signup.php', {
          method: 'POST',
          body: JSON.stringify({
            email: e_mail,
            password: code,
            username: uname,
            gender: sex,
            fullname: full_name,
          }),
        })
          .then((response) => response.text())
          .then((text) => {
            setLoading(false);

            if (text.includes('Register Successfully')) {
              Toast.show(text, Toast.SHORT);
              navigation.navigate('Login');
            } else {
              Toast.show(text, Toast.SHORT);
            }
          }); 

      }  
    } 
  };

  const setGenderRadio = (label) => {
    if (label) {
      setGender('male');
    } else {
      setGender('female');
    }
  };

  return (
    <ImageBackground
      source={require('../images/loginbg.jpg')}
      style={{flex: 1, width: null, height: null}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.containers}>
          {loading ? (
            <BarIndicator
              color="white"
              animationDuration={800}
              count={4}
              size={30}
            />
          ) : (
            <View style={styles.main}>
              <View style={styles.inputcontainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#ededed"
                  value={fullname}
                  onChangeText={(text) => setFullname(text)}></TextInput>

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#ededed"
                  value={email}
                  autoCapitalize="none"
                  onChangeText={(text) => setEmail(text)}></TextInput>

                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#ededed"
                  value={username}
                  autoCapitalize="none"
                  onChangeText={(text) => setUsername(text)}></TextInput>

                <View style={styles.radiobutton}>
                  <Text style={{paddingTop: 20, color: 'white', fontSize: 17}}>
                    Gender:{' '}
                  </Text>
                  <RadioForm
                    buttonSize={12}
                    radioStyle={{paddingTop: 25, marginLeft: 20}}
                    selectedButtonColor="white"
                    labelColor="white"
                    placeholderTextColor="white"
                    formHorizontal={true}
                    labelHorizontal={true}
                    radio_props={radioProps}
                    onPress={(value) => setGenderRadio(value)}
                    animation={true}
                    buttonWrapStyle={{marginLeft: 300}}
                  />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#ededed"
                  secureTextEntry={true}
                  value={password}
                  autoCapitalize="none"
                  onChangeText={(text) => setPassword(text)}></TextInput>

                <TextInput
                  style={styles.input}
                  placeholder="Confirm password"
                  placeholderTextColor="#ededed"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  value={confirm_password}
                  onChangeText={(text) => setConfirmPassword(text)}></TextInput>
              </View>

              <TouchableOpacity style={styles.signinButton} onPress={register}>
                <Text style={styles.opacitytext}>Register</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUp;