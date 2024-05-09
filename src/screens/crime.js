import React, { useEffect, useState, useRef, useMemo } from 'react';
import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { View, Alert, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView from "react-native-map-clustering"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


import markers2 from './markers2.json';


const NYC_BOUNDARY = {
  latitude: 40.7128,
  longitude: -74.0060,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};
const initial_Region = {
  latitude: 40.769,
  longitude: -73.982,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default function PlaceholderScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef();
  const memoizedMarkers = useMemo(() => markers2, []);

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
    southWest: { latitude: 40.49, longitude: -73.68 }
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setMapBoundaries(
        nycBoundaries.northEast,
        nycBoundaries.southWest
      );
    }
  });

  async function moveToLocation(latitude, longitude) {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      100
    );
  }
  
  const handleAlert = (offence, level, description,  borough, time, department) => {
    Alert.alert(offence, 'Level: ' + level + '\nDescription: ' + description + ''+ '\nBorough: ' + borough + '\nTime: ' + time + '\nDepartment: ' + department,
    [
      {text: 'ok', onPress: () => console.log('ok pressed')}
    ])
  }
  return (
    <SafeAreaView style={{ marginTop: 50, flex: 1 }}>
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
        textInputProps={{ clearButtonMode: 'always' }}
        onFail={error => console.log(error)}
        styles={{
          container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
          listView: { backgroundColor: "white" }
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
        clusterColor='#F3BDB1'
        radius={40}
        extent={200}
        tracksViewChanges={false}
        mapPadding={{ top: 40, right: 0, left: 0, bottom: 0 }}

      >
        {/* {markers.map((markers, index) =>(
          <Marker key={index} coordinate={{latitude: markers.Latitude, longitude: markers.Longitude}} opacity={0.7}/>
        ))} */}

        {/* {markers2.map((markers2, index) =>(
          <Marker key={index} coordinate={{latitude: markers2.Latitude, longitude: markers2.Longitude}} opacity={1}/>
        ))} */}
        {memoizedMarkers.map((markers2, index) => (
          <Marker key={index} coordinate={{ latitude: markers2.Latitude, longitude: markers2.Longitude }} opacity={1} tracksViewChanges={false} 
          onCalloutPress={() => handleAlert(markers2.OFNS_DESC, markers2.LAW_CAT_CD, markers2.PD_DESC, markers2.BORO_NM, markers2.CMPLNT_FR_TM, markers2.JURIS_DESC)}>
            {/* <Text>{testM.LAW_CAT_CD}</Text> */}
            <Callout>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                  {markers2.OFNS_DESC}
                </Text>
                <Text style={{ fontSize: 10, textAlign: 'center' }}>
                  {markers2.CMPLNT_FR_DT}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}

      </MapView>

    </SafeAreaView>
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
        color: '#FFFFFF', // White text color
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#121212', // Dark text stroke color
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2E2E2E', // Dark administrative areas color
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#CCCCCC', // Light grey country labels
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#FFFFFF', // White POI labels
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#1E1E1E', // Dark park area color
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#333333', // Dark road color
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#FFFFFF', // White road labels
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000', // Black water color
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#FFFFFF', // White water labels
      },
    ],
  },
];
