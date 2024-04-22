//This screen is for testing purposes only and will get scrapped once the app is fully functional

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BlackButton from '../components/buttons/BlackButton.js';

export default function PlaceholderScreen() {
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