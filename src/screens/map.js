import React, { useEffect, useState, useRef } from 'react';
import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { View, Alert, StyleSheet, Text } from 'react-native';
import * as Location from 'expo-location';
import MapView from "react-native-map-clustering"
// import Supercluster from 'supercluster';

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
  
  const onMarkerSelected = () =>{
    Alert.alert(testM.PD_DESC);
  }
  return (
    <View style={styles.container}>
      
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initial_Region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        customMapStyle={mapStyle}
        ref={mapRef}
        clusterColor='#F3BDB1'   
        radius={40}
        extent={200}
        tracksViewChanges={false}
        clusteringEnabled={true}
        
    >
        {/* {markers.map((markers, index) =>(
          <Marker key={index} coordinate={{latitude: markers.Latitude, longitude: markers.Longitude}} opacity={0.7}/>
        ))} */}

        {/* {markers2.map((markers2, index) =>(
          <Marker key={index} coordinate={{latitude: markers2.Latitude, longitude: markers2.Longitude}} opacity={1}/>
        ))} */}
      
        {markers2.map((markers2, index) =>(
          <Marker key={index} coordinate={{latitude: markers2.Latitude, longitude: markers2.Longitude}} opacity={1}>
            {/* <Text>{testM.LAW_CAT_CD}</Text> */}
            <Callout>
              <View style={{ padding: 10}}>
                <Text style={{ fontSize: 20 ,textAlign: 'center'}}>
                  {markers2.OFNS_DESC}
                </Text>
                <Text style={{ fontSize: 10 ,textAlign: 'center'}}>
                  {markers2.CMPLNT_FR_DT}
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
