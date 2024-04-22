import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Ensure StyleSheet is imported
import BlackButton from '../components/buttons/BlackButton.js';

function PlaceholderScreen() {
  return (
    <View style={styles.container}>
      <BlackButton />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});



export default PlaceholderScreen;
