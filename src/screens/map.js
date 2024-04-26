import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const NYC_BOUNDARY = {
  latitude: 40.7128,
  longitude: -74.0060,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};
const  initial_Region ={
  latitude: 40.769, 
  longitude: -73.982, 
  latitudeDelta: 0.09,
  longitudeDelta: 0.04,

}

export default function PlaceholderScreen() {
  const [userLocation, setUserLocation] = useState(null);

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
        'This map is only for New York City (NYC)! Please use it within NYC boundaries.',
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initial_Region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        customMapStyle={mapStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

const mapStyle = [
  [
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]
];
