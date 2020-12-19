import React,{useState} from 'react';
import { Button,TextInput } from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

const LoginScreen = (props) => {
  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <StatusBar backgroundColor="blue" barStyle="light-content"/>
        <Text 
          style={{
            fontSize:30,marginLeft:18,marginTop:10,color:"grey"
          }}
        >Welcome to Clinical portal</Text>

        <Text 
          style={{
            fontSize:20,
            marginLeft:18,
            marginTop:10,
            color:"blue"
          }}
        >Login</Text>

        <View
        style={{
          borderBottomColor:"blue",
          borderBottomWidth:4,
          borderRadius:10,
          marginLeft:20,
          marginRight:18,
          marginTop:4
        }}
        />
        <TextInput
          label="Email"
          mode="outlined"
          style={{marginLeft:18,marginRight:18,marginTop:18}}
          theme={{colors:{primary:"blue"}}}
        />
        <TextInput
          label="Password"
          mode="outlined"
          style={{marginLeft:18,marginRight:18,marginTop:18}}
          theme={{colors:{primary:"blue"}}}
        />
        <Button 
          mode="contained" 
          style={{marginLeft:18,marginRight:18,marginTop:20}}
          onPress={() => console.log('Pressed')}>
          Login
        </Button>
        <Button 
          mode="contained" 
          style={{marginLeft:18,marginRight:18,marginTop:10}}
          onPress={() => console.log('Pressed')}>
          Cancel
        </Button>

        <TouchableOpacity>
          <Text
            style={{marginTop:18,marginLeft:18}} 
            onPress={()=>props.navigation.replace("signup")}     
          >Don't have an account?</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
