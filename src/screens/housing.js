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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  input: {
    flex: 1,
    color: '#FFFFFF', // Text color for input in dark mode
    height: 40, // Increase the height
    paddingHorizontal: 10,
    borderRadius: 20, // Oval-shaped input
    borderWidth: 1,
    borderColor: '#CCCCCC', // Border color
    marginRight: 10,
  },
});

const darkModeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000000', // Dark background color
  },
  inputContainer: {
    backgroundColor: '#222222', // Darker input container background color
  },
  input: {
    color: '#FFFFFF', // Text color for input in dark mode
    borderColor: '#FFFFFF', // Darker border color for input
  },
  placeholderTextColor: '#777777', // Placeholder text color for input in dark mode
  buttonColor: '#FFFFFF', // Button color in dark mode
});

export default ZillowEmbed;
