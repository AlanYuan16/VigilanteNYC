//This screen is for testing purposes only and will get scrapped once the app is fully functional

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getDatabase } from '@firebase/database';
import { ref, child, update } from '@firebase/database';



//Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyDF_w-f-b_ZKAxUbONooq9sj3DyeOXGbmg",
  authDomain: "vigilantenyc-1c10f.firebaseapp.com",
  databaseURL: "https://vigilantenyc-1c10f-default-rtdb.firebaseio.com",
  projectId: "vigilantenyc-1c10f",
  storageBucket: "vigilantenyc-1c10f.appspot.com",
  messagingSenderId: "303549061074",
  appId: "1:303549061074:web:44d50628c07e9de75cda0b",
  measurementId: "G-C9YRENCTEP"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


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

  //function will handle the zip code submission
  const handleSubmitZipCode = () => {
    //Fix exception handling later
    if (zipCode === '') {
      Alert.alert('Invalid input', 'Please enter a zip code');
    } else {
      if (zipCode !== lastZipCode) {
        setCounters({ '😍': 0, '😊': 0, '😐': 0, '😔': 0, '😡': 0 });
        setLastZipCode(zipCode);
      }
      setShowEmojis(true);
    }
  };


  const handleEmojiSelection = (emoji) => {
    // Check if the emoji has already been selected
    if (selectedEmoji === emoji) {
      return; // Exit the function if the emoji has already been selected
    }
  
    const emojiRef = child(ref(db), `emojis/${zipCode}/${emoji}`);
    
    // Update local state counters
    setCounters((prevCounters) => ({
      ...prevCounters,
      [selectedEmoji]: (prevCounters[selectedEmoji] || 0) - 1, // Decrement previous emoji count
      [emoji]: (prevCounters[emoji] || 0) + 1, // Increment selected emoji count
    }));
  
    // Update count in the database
    update(emojiRef, { count: counters[emoji] + 1 });
  
    // Set the selected emoji
    setSelectedEmoji(emoji);
  };
  

  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Enter Zip Code:</Text>
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