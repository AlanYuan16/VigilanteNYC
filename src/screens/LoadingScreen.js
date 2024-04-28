import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress < 1) {
          return prevProgress + 0.1; 
        } else {
          clearInterval(interval);
          return 1;
        }
      });
    }, 300); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <ImageBackground
      source={require('../screens/homepage.jpg')}
      style={styles.background}
    >
      <Text style={styles.title}>Vigilante NYC</Text>
      <Text style={styles.welcome}>Welcome!</Text>
      <View style={styles.progressContainer}>
        <Progress.Bar
          progress={progress}
          width={200}
          color="white" 
          borderColor="black" 
          marginTop={455}
          style={styles.progressBar}
        />
      </View>
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
  progressContainer: {
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 70, // Adjust the marginTop as needed
  },
  welcome: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: 200, 
    left: 0,
    right: 0,
  },
});

export default LoadingScreen;
