import React, { useEffect, useState, useRef } from 'react';
import MapView ,{ PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { View, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';
import schoolMarkers from './schoolMarkers.json';
import parks from './parks.json';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dimensions } from 'react-native';

//Setting boundaries for NYC
const NYC_BOUNDARY = {
  latitude: 40.7128,
  longitude: -74.0060,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};


//Starting region of the map
const initial_Region = {
  latitude: 40.769,
  longitude: -73.982,
  latitudeDelta: 0.09,
  longitudeDelta: 0.04,
};


//hooks
export default function PlaceholderScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [visibleSchoolMarkers, setVisibleSchoolMarkers] = useState(false);
  const [visibleParkMarkers, setVisibleParkMarkers] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (userLocation && !isInNYC(userLocation)) {
      Alert.alert(
        'Map Alert',
        'This map is only for New York City (NYC)! Please use it within NYC boundaries.'
      );
    }
  }, [userLocation]);

  //function to check if the location is within the boundaries of NYC
  const isInNYC = (location) => {
    return (
      location.latitude > NYC_BOUNDARY.latitude - NYC_BOUNDARY.latitudeDelta &&
      location.latitude < NYC_BOUNDARY.latitude + NYC_BOUNDARY.latitudeDelta &&
      location.longitude > NYC_BOUNDARY.longitude - NYC_BOUNDARY.longitudeDelta &&
      location.longitude < NYC_BOUNDARY.longitude + NYC_BOUNDARY.longitudeDelta
    );
  };

  //latitude and longitude boundaries for NYC
  const nycBoundaries = {
    northEast: { latitude: 40.92, longitude: -74.27 },
    southWest: { latitude: 40.49, longitude: -73.68 },
  };

  //hook to set boundaries of the map
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setMapBoundaries(
        nycBoundaries.northEast,
        nycBoundaries.southWest
      );
    }
  });

  const toggleSchoolMarkers = () => {
    setVisibleSchoolMarkers((prevValue) => !prevValue);
  };

  const toggleParkMarkers = () => {
    setVisibleParkMarkers((prevValue) => !prevValue);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevValue) => !prevValue);
  };

  const handleMarkerPress = (markerName) => {
    Alert.alert('Marker Info', `You clicked on ${markerName}`);
  };
//render
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initial_Region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        customMapStyle={darkMapStyle} 
        ref={mapRef}
      >
        {visibleSchoolMarkers &&
          schoolMarkers.map((schoolMarker, index) => (
            <Marker
              key={'school_' + index}
              coordinate={{
                latitude: schoolMarker.Latitude,
                longitude: schoolMarker.Longitude,
              }}
              pinColor="blue" 
            >
              <Callout>
                <View style={{ padding: 10}}>
                  <Text style={{ fontSize: 20 ,textAlign: 'center'}}>
                    {schoolMarker.school_name}
                  </Text>
                </View>
              </Callout>              
            </Marker>

          ))}
        {visibleParkMarkers &&
          parks.map((park, index) => (
            <Marker
              key={'park_' + index}
              coordinate={{
                latitude: park.latitude,
                longitude: park.longitude,
              }}
              pinColor="green"
            >
              <Callout>
                <View style={{ padding: 10}}>
                  <Text style={{ fontSize: 20 ,textAlign: 'center'}}>
                    {park.name}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
      <TouchableOpacity onPress={toggleDropdown} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>Toggle Markers</Text>
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={toggleSchoolMarkers} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText1}>School</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleParkMarkers} style={styles.dropdownButton}>
            <Text  style={styles.dropdownButtonText}>Parks</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  toggleButton: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.06,
    right: Dimensions.get('window').width * 0.01,
    backgroundColor: '#37505C',
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.11, // Adjust the top value
    right: Dimensions.get('window').width * 0.01,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10, // Add padding
    borderRadius: 5,
  },
  dropdownButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  dropdownButtonText: {
    color: 'green',
    textAlign: 'center',
  },
  dropdownButtonText1: {
    color: 'blue',
    textAlign: 'center',
  },
  
});


const darkMapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#121212', // Dark background color
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#FFFFFF', 
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#121212', 
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2E2E2E', 
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#CCCCCC', 
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#FFFFFF', 
      },
    ]
  },

  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#1E1E1E', 
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#333333',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#FFFFFF', 
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000', 
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#FFFFFF', 
      },
    ],
  },
];