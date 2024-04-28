import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <ImageBackground
      source={require('../screens/homepage.jpg')}
      style={styles.background}
    >
      <Text style={styles.title}>Welcome!</Text>  
      <Text style={styles.title}>Vigilante NYC</Text>
      <View style={styles.container}></View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50, // Adjust the marginTop as needed
  },
});

export default LoadingScreen;
