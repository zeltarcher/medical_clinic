import React from 'react';
import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

const LoadingScreen = () => {
  return (
    <>
    <View
        style={styles.loading}
    >        
      <ActivityIndicator 
        size="large"
        color="blue"
      />
    </View>
    </>
  );
};
const styles = StyleSheet.create({
    loading:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    }
  })
export default LoadingScreen;
