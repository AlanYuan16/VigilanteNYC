import React from 'react';
import MapView from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';


mapStyle= 
[
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

export default function PlaceholderScreen() {
  return (
    <View style={mapFormat.container}>
      <MapView 
      style={mapFormat.map}
      customMapStyle={mapStyle}
      initialRegion = {{
        latitude: 40.769, 
        longitude: -73.982, 
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const mapFormat = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: "100%",
  },
});