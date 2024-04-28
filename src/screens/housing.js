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
    <View style={styles.container}>
      {showSearch && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter ZIP code"
            value={zipcode}
            onChangeText={handleZipcodeChange}
            keyboardType="numeric"
          />
          <Button title="Submit" onPress={handleSubmit} />
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

export default ZillowEmbed;
