import React, {useRef, useEffect} from 'react';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';




export default function PlaceholderScreen() {
  const mapRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{padding: 10}}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      )
    })
  })
  const focusMap = () =>{
    const park = {
      latitude: 40.7826,
      longitude: -73.9656,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    };

    mapRef.current.animateToRegion(park);
  }

  const nycBoundaries = {
    northEast: { latitude: 40.92, longitude: -74.27 },
    southWest: { latitude: 40.49, longitude: -73.68}
  };
  
  useEffect(() => {
    if(mapRef.current){
      mapRef.current.setMapBoundaries(
        nycBoundaries.northEast,
        nycBoundaries.southWest
      );
    }
  });

  return (
    <View style={mapFormat.container}>
      <MapView 
      style={mapFormat.container}
      provider={PROVIDER_GOOGLE}
      customMapStyle={mapStyle}
      initialRegion = {{
        latitude: 40.769, 
        longitude: -73.982, 
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      }}
      ref={mapRef}
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
mapStyle= 
[
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]