import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

//hooks
const ZillowEmbed = () => {
  const [zipcode, setZipcode] = useState('');
  const [url, setUrl] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  //zipcode useState
  const handleZipcodeChange = (text) => {
    setZipcode(text);
  };

  //url embed
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


//styles
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
    color: '#FFFFFF', 
    paddingHorizontal: 10,
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: '#CCCCCC', 
    marginRight: 10,
  },
});
//created a separate object for dark mode styles prior to the search
const darkModeStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000000', 
  },
  inputContainer: {
    backgroundColor: '#222222', 
  },
  input: {
    color: '#FFFFFF', 
    borderColor: '#FFFFFF', 
  },
  placeholderTextColor: '#777777', 
  buttonColor:  {
  backgroundColor: 'white', 
  borderRadius: 20, 
  },
});


export default ZillowEmbed;
