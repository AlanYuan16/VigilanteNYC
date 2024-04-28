import React, { useEffect, useState, useRef } from 'react';
import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { View, Alert, StyleSheet, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView from "react-native-map-clustering"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import markers from './markers.json';
import markers2 from './markers2.json';
import testM from './testM.json';



const NYC_BOUNDARY = {
  latitude: 40.7128,
  longitude: -74.0060,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};
const  initial_Region ={
  latitude: 40.769, 
  longitude: -73.982, 
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default function PlaceholderScreen() {
  const [userLocation, setUserLocation] = useState(null);
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
  
  async function moveToLocation(latitude, longitude) {
    mapRef.current.animateCamera(
      {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        zoom: 40,
      },
      3000,
    );   
  }
  return (
    <View style={{ marginTop: 20, flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance"
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(JSON.stringify(details?.geometry?.location))
          moveToLocation(details?.geometry?.location.lat, details?.geometry?.location.lng);
        }}
        query={{
          key: 'AIzaSyDYey2cc5cl_2wfxC37QiFH7gQ4nL7-8zk',
          language: 'en',
          components: "country:us",
          radius: 30000,
        }}
        onFail={error => console.log(error)}
        styles={{
          container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
          listView: { backgroundColor: "white"}
        }}
      />

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initial_Region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        customMapStyle={mapStyle}
        ref={mapRef}
        camera={{zoom: 40}}
        clusterColor='#F3BDB1'   
        radius={40}
        extent={200}
        tracksViewChanges={false}
        mapPadding={{top:40, right:0, left:0, bottom:0}}
      
    >
        {/* {markers.map((markers, index) =>(
          <Marker key={index} coordinate={{latitude: markers.Latitude, longitude: markers.Longitude}} opacity={0.7}/>
        ))} */}

        {/* {markers2.map((markers2, index) =>(
          <Marker key={index} coordinate={{latitude: markers2.Latitude, longitude: markers2.Longitude}} opacity={1}/>
        ))} */}
        
        {testM.map((testM, index) =>(
          <Marker key={index} coordinate={{latitude: testM.Latitude, longitude: testM.Longitude}} opacity={1}>
            {/* <Text>{testM.LAW_CAT_CD}</Text> */}
            <Callout>
              <View style={{ padding: 10}}>
                <Text style={{ fontSize: 20 ,textAlign: 'center'}}>
                  {testM.OFNS_DESC}
                </Text>
                <Text style={{ fontSize: 10 ,textAlign: 'center'}}>
                  {testM.CMPLNT_FR_DT}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
                
        
      </MapView>
      
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
