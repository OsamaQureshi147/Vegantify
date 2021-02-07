import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
    main:{ 
      flexDirection: 'column',
      flex: 7,
      justifyContent: 'center', 
      alignItems: 'center',
  
    },
  
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
  },

    inputcontainer:
    { 
      ...Platform.select({
        ios: {
        
        },
        android: {
          
        },
      }),
      width:'80%',
      flexDirection:'column', 
      display: "flex", 
    },


    Imagecontainer:
    { 
      flex:2,
      justifyContent:'flex-end',
      alignItems:'center',
    
  
    },
    textcontainer:
    {
      marginStart:20,
      justifyContent: 'center', 
      alignItems: 'center',
      marginEnd:20,
      flexDirection: 'column',
    },
    input:
    { 
      ...Platform.select({
        ios: {
          padding: 10,
        },
        android: {
          
        },
      }),
      color:'white',
      fontSize:15, 
      textAlign:'center',
      paddingStart:10,
      paddingEnd:10,
      borderColor:'white',
      borderRadius:100/2, 
      borderWidth:0.7,
      maxHeight:45,
      marginBottom: 15,
    },


    input2:
    { 
      ...Platform.select({
        ios: {
          padding: 10,
        },
        android: {
          
        },
      }),
      color:'white',
      fontSize:15,
      textAlign:'center',
      paddingStart:10,
      paddingEnd:10,
      marginTop:20,
      borderColor:'white',
      borderRadius:100/2,
      maxHeight:45,
      borderWidth:0.7 
    },
    
    text:
    { 
      fontSize:14,
      marginBottom:30,
      marginStart:10,
      marginTop:18, 
      color:'white'
    },

    opacitytext:
    { 
      fontSize:15, 
      color:'white'
    },

    signinButton:
    {
      backgroundColor: '#3a40e0',
      width: 200,
      padding: 10,
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 50,
    },
  

    signUpButton: {
      color: "white", 
      textDecorationLine: 'underline',
      fontStyle: 'italic',
    },
  
    backgroundImage: {
      flex: 1,
      alignSelf: 'stretch',
      width: null,
    }
  });

  export default styles;