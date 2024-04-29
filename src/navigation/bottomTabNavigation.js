import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import MapScreen from '../screens/map.js';
import SchoolingScreen from '../screens/schooling.js';
import HousingScreen from '../screens/housing.js';
import EmojiFeedbackPage from '../screens/EmojiFeedback.js';
import CrimeMap from '../screens/crime.js';

// Image imports
import MapIcon from '../assets/location-map-2956.png';
import SchoolIcon from '../assets/school-building-12427.png';
import HousingIcon from '../assets/bungalow-1881.png';
import ReviewIcon from '../assets/discord-8249.png';
import CrimeIcon from '../assets/theif_mask_crime_icon_191227.png';



const Tab = createBottomTabNavigator();

const CustomBottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconSource;

            if (route.name === 'Crime') {
                iconSource = focused ? CrimeIcon : CrimeIcon;
            } else if (route.name === 'Map') {
                iconSource = focused ? MapIcon : MapIcon;
            } else if (route.name === 'Schooling') {
                iconSource = focused ? SchoolIcon : SchoolIcon;
            } else if (route.name === 'Housing') {
                iconSource = focused ? HousingIcon : HousingIcon;
            } else if (route.name === 'Review') {
                iconSource = focused ? ReviewIcon : ReviewIcon;
            }

            // Return an Image component with the appropriate icon source
            return <Image source={iconSource} style={{ width: size, height: size }} />;
        },
    })}
>   
    <Tab.Screen name="Crime" component={CrimeMap} options={{headerShown: false}}/>
    <Tab.Screen name="Map" component={MapScreen} options={{headerShown: false}}  />
    <Tab.Screen name="Schooling" component={SchoolingScreen} options={{headerShown: false}} />
    <Tab.Screen name="Housing" component={HousingScreen}  options={{headerShown: false}}/>
    <Tab.Screen name="Review" component={EmojiFeedbackPage} options={{headerShown: false}} />
</Tab.Navigator>
  );
};

export default CustomBottomTabNavigator;

