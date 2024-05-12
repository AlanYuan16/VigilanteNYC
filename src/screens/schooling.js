import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import data from '../api/school.json';

//hooks
const PlaceholderScreen = () => {
  const [zipcode, setZipcode] = useState('');
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);

  //filter schools based on zipcode
  useEffect(() => {
    if (zipcode) {
      const schoolsInZip = data.filter(school => school.zip === parseInt(zipcode));
      setFilteredSchools(schoolsInZip);
    } else {
      setFilteredSchools([]);
    }
  }, [zipcode]);

  //change color based on graduation rate
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
  //update the state of the selected school
  const selectSchool = (school) => {
    setSelectedSchool(school);
  };

  //funciton to close popup of more information
  const closeDetails = () => {
    setSelectedSchool(null);
  };

  //rendering 
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
      {selectedSchool ? (
        <ScrollView>
          <View style={styles.selectedSchoolContainer}>
            <Text style={styles.selectedSchoolTitle}>{selectedSchool.school_name}</Text>
            <Text style={styles.description}>{selectedSchool.description}</Text>
            <Text style={styles.additionalInfo}>Student Safety: {selectedSchool.stu_safety}%</Text>
            <Text style={styles.additionalInfo}>PSAL Male Sports: {selectedSchool.psal_male}</Text>
            <Text style={styles.additionalInfo}>PSAL Female Sports: {selectedSchool.psal_female}</Text>
            <TouchableOpacity onPress={closeDetails}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <>
          <FlatList
            data={filteredSchools}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectSchool(item)}>
                <View style={styles.schoolContainer}>
                  <Text style={styles.schoolName}>{item.school_name}</Text>
                  {renderGraduationRate(item.graduation_rate)}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.school_name}
          />
          {filteredSchools.length === 0 && <Text style={styles.noResults}>No schools found for the entered zipcode.</Text>}
        </>
      )}
    </View>
  );
};
//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 90,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFF',
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
    borderRadius: 20, 
    backgroundColor: '#FFFFFF', 
  },
  schoolContainer: {
    marginBottom: 20,
  },
  schoolName: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF', 
  },
  description: {
    marginTop: 10,
    marginLeft: 4,
    color: '#FFFFFF', 
  },
  selectedSchoolContainer: {
    marginTop: 20,
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
  },
  selectedSchoolTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  additionalInfo: {
    color: '#FFF',
    marginBottom: 5,
    padding: 5,
    marginLeft: 4,
  },
  closeButton: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 10,
  },
  noResults: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    padding:29,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PlaceholderScreen;
