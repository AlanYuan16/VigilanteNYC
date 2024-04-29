import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const ZillowEmbed = () => {
  const [zipcode, setZipcode] = useState('');
  const [url, setUrl] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  const handleZipcodeChange = (text) => {
    setZipcode(text);
  };

  const handleSubmit = () => {
    if (zipcode) {
      setUrl(`https://www.zillow.com/new-york-ny-${zipcode}`);
      setShowSearch(false);
    }
  };

  return (
    <View style={[styles.container, darkModeStyles.container]}>
      {showSearch && (
        <View style={[styles.inputContainer, darkModeStyles.inputContainer]}>
          <TextInput
            style={[styles.input, darkModeStyles.input]}
            placeholder="Enter ZIP code"
            placeholderTextColor={darkModeStyles.placeholderTextColor}
            value={zipcode}
            onChangeText={handleZipcodeChange}
            keyboardType="numeric"
          />
          <Button title="Submit" onPress={handleSubmit} color={darkModeStyles.buttonColor} />
        </View>
      )}
      {url ? (
        <WebView
          source={{ uri: url }}
          style={{ flex: 1 }}
          onLoad={() => setShowSearch(false)}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

const darkModeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000', // Dark background color
  },
  inputContainer: {
    backgroundColor: '#222', // Darker input container background color
  },
  input: {
    color: '#fff', // Text color for input in dark mode
    borderColor: '#444', // Darker border color for input
  },
  placeholderTextColor: '#777', // Placeholder text color for input in dark mode
  buttonColor: '#00f', // Button color in dark mode
});

export default ZillowEmbed;
