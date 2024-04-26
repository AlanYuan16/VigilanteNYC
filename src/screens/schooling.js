import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import data from '../api/Schoolingv2.json';

export default function PlaceholderScreen() {
  const [zipcode, setZipcode] = useState('');
  const [filteredSchools, setFilteredSchools] = useState([]);


  // Filters the schools, uses the hook to update the filtered schools when the zipcode changes
  useEffect(() => {
    if (zipcode) {
      const schoolsInZip = data.filter(school => school.zip === parseInt(zipcode));
      setFilteredSchools(schoolsInZip);
    } else {
      setFilteredSchools([]);
    }
  }, [zipcode]);


  //top is the title, the rest is the list of schools
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search High School by Zipcode</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Zipcode"
          onChangeText={setZipcode}
          value={zipcode}
          keyboardType="numeric"
        />
      </View>
      {filteredSchools.length > 0 ? (
        <FlatList
          data={filteredSchools}
          renderItem={({ item }) => (
            <View style={styles.schoolContainer}>
              <Text style={styles.schoolName}>{item.school_name}</Text>
              <Text>{item.description}</Text>
              <Text>Graduation Rate: {item.graduation_rate}</Text>
            </View>
          )}
          keyExtractor={item => item.school_name}
        />
      ) : (
        <Text>No schools found for the entered zipcode.</Text>
      )}
    </View>
  );
}


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 20,
  },
  schoolContainer: {
    marginBottom: 20,
  },
  schoolName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
