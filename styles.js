import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    main:{ 
      flexDirection: 'column',
      flex: 7,
      justifyContent: 'center', 
      alignItems: 'center',
  
    },
  
    container:
    { 
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputcontainer:
    { 
   
      flexDirection:'column', 
      display: "flex", 
      width:'80%',
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
    buttoncontainer:
    {
      marginTop:20,
      width:'50%'
    },
    Button:
    {
      padding:20,
      width: 400,
      backgroundColor: 'green',
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