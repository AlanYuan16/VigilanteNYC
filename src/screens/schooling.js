import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import data from '../api/Schoolingv2.json';

export default function PlaceholderScreen() {
  const [zipcode, setZipcode] = useState('');
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);

  // Filters the schools, uses the hook to update the filtered schools when the zipcode changes by the user
  useEffect(() => {
    if (zipcode) {
      const schoolsInZip = data.filter(school => school.zip === parseInt(zipcode));
      setFilteredSchools(schoolsInZip);
    } else {
      setFilteredSchools([]);
    }
  }, [zipcode]);


  //changes the color of the graduation rate based on the value
  const renderGraduationRate = (graduationRate) => {
    let color;
    if (graduationRate >= 90) {
      color = 'green';
    } else if (graduationRate >= 80) {
      color = '#B3D23E';      
    } else if (graduationRate >= 70) {
      color = 'orange';
    } else {
      color = 'red';
    }
    return (
      <Text style={{ color }}>Graduation Rate {graduationRate}%</Text>
    );
  };


  // Toggles the description of the school for later dropdown
  const toggleDescription = (school) => {
    setSelectedSchool(selectedSchool === school ? null : school);
  };

  // Renders the screen
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
            <TouchableOpacity onPress={() => toggleDescription(item)}>
              <View style={styles.schoolContainer}>
                <Text style={styles.schoolName}>{item.school_name}</Text>
                {renderGraduationRate(item.graduation_rate)}
                {selectedSchool === item && (
                  <Text style={styles.description}>{item.description}</Text>
                )}
              </View>
            </TouchableOpacity>
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
    backgroundColor: '#000', // Dark background color
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFF', // White text color
    padding: 50,
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
    borderRadius: 20, // Oval search bar
    backgroundColor: '#FFF', // White background for search bar
  },
  schoolContainer: {
    marginBottom: 20,
  },
  schoolName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFF', // White text color for school name
  },
  description: {
    marginTop: 10,
    marginLeft: 10,
    color: '#FFF', // White text color for description
  },
});

