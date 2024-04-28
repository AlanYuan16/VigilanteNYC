import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

const EmojiFeedbackPage = () => {
  const [zipCode, setZipCode] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [lastSelectedEmoji, setLastSelectedEmoji] = useState('');
  const [counters, setCounters] = useState({ '😍': 0, '😊': 0, '😐': 0, '😔': 0, '😡': 0 });
  const [showEmojis, setShowEmojis] = useState(false);
  const [lastZipCode, setLastZipCode] = useState('');

  const handleZipCodeChange = (text) => {
    setZipCode(text);
  };

  const handleSubmitZipCode = () => {
    if (zipCode === '') {
      Alert.alert('Error', 'Please enter a zip code');
    } else {
      if (zipCode !== lastZipCode) {
        setCounters({ '😍': 0, '😊': 0, '😐': 0, '😔': 0, '😡': 0 });
        setLastZipCode(zipCode);
      }
      setShowEmojis(true);
    }
  };

  const handleEmojiSelection = (emoji) => {
    if (lastSelectedEmoji === emoji) {
      setCounters((prevCounters) => ({ ...prevCounters, [emoji]: prevCounters[emoji] - 1 }));
      setLastSelectedEmoji('');
    } else {
      setCounters((prevCounters) => {
        const updatedCounters = { [emoji]: 1 };
        Object.keys(prevCounters).forEach((key) => {
          if (key !== emoji) {
            updatedCounters[key] = 0;
          }
        });
        return updatedCounters;
      });
      setLastSelectedEmoji(emoji);
    }
    setSelectedEmoji(emoji);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Enter Your Zip Code:</Text>
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={handleZipCodeChange}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitZipCode}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {showEmojis && (
        <View>
          <Text style={styles.heading}>Select an Emoji:</Text>
          <View style={styles.emojiContainer}>
            <TouchableOpacity onPress={() => handleEmojiSelection('😍')}>
              <Text style={selectedEmoji === '😍' ? styles.selectedEmoji : styles.emoji}>😍</Text>
              <Text>{counters['😍']}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEmojiSelection('😊')}>
              <Text style={selectedEmoji === '😊' ? styles.selectedEmoji : styles.emoji}>😊</Text>
              <Text>{counters['😊']}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEmojiSelection('😐')}>
              <Text style={selectedEmoji === '😐' ? styles.selectedEmoji : styles.emoji}>😐</Text>
              <Text>{counters['😐']}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEmojiSelection('😔')}>
              <Text style={selectedEmoji === '😔' ? styles.selectedEmoji : styles.emoji}>😔</Text>
              <Text>{counters['😔']}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleEmojiSelection('😡')}>
              <Text style={selectedEmoji === '😡' ? styles.selectedEmoji : styles.emoji}>😡</Text>
              <Text>{counters['😡']}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  emojiContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  emoji: {
    fontSize: 40,
    marginHorizontal: 10,
  },
  selectedEmoji: {
    fontSize: 40,
    marginHorizontal: 10,
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EmojiFeedbackPage
