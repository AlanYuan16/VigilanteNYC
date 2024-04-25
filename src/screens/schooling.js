import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default function PlaceholderScreen() {
  const [zipcode, setZipcode] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Zipcode"
          onChangeText={setZipcode}
          value={zipcode}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  
  searchContainer: {
    position: 'absolute',
    top: 100, // Adjust this value as needed
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 200,
  },
});
