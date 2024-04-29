import React, { useEffect, useState, useRef } from 'react';
import MapView ,{ PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { View, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';
import schoolMarkers from './schoolMarkers.json';
import parks from './parks.json';
import ModalDropdown from 'react-native-modal-dropdown';

const NYC_BOUNDARY = {
  latitude: 40.7128,
  longitude: -74.0060,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

const initial_Region = {
  latitude: 40.769,
  longitude: -73.982,
  latitudeDelta: 0.09,
  longitudeDelta: 0.04,
};

export default function PlaceholderScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [visibleSchoolMarkers, setVisibleSchoolMarkers] = useState(false); // Initialize to false
  const [visibleParkMarkers, setVisibleParkMarkers] = useState(false); // Initialize to false
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to track visibility of dropdown
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

  const isInNYC = (location) => {
    return (
      location.latitude > NYC_BOUNDARY.latitude - NYC_BOUNDARY.latitudeDelta &&
      location.latitude < NYC_BOUNDARY.latitude + NYC_BOUNDARY.latitudeDelta &&
      location.longitude > NYC_BOUNDARY.longitude - NYC_BOUNDARY.longitudeDelta &&
      location.longitude < NYC_BOUNDARY.longitude + NYC_BOUNDARY.longitudeDelta
    );
  };

  const nycBoundaries = {
    northEast: { latitude: 40.92, longitude: -74.27 },
    southWest: { latitude: 40.49, longitude: -73.68 },
  };

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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initial_Region}
        showsUserLocation={true}
        showsMyLocationButton={true}
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
            <Text style={styles.dropdownButtonText}>School</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleParkMarkers} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>Parks</Text>
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
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
  },
  dropdownButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  dropdownButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
