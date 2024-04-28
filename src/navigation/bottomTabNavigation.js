import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import MapScreen from '../screens/map.js';
import SchoolingScreen from '../screens/schooling.js';
import HousingScreen from '../screens/housing.js';
import EmojiFeedbackPage from '../screens/EmojiFeedback.js';

// Image imports
import MapIcon from '../assets/location-map-2956.png';
import SchoolIcon from '../assets/school-building-12427.png';
import HousingIcon from '../assets/bungalow-1881.png';
import ReviewIcon from '../assets/discord-8249.png';

// Creating the bottom navigation bar object
const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return (
        // Creating the three tabs with the functions of our application
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;

                    if (route.name === 'Map') {
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
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Schooling" component={SchoolingScreen} />
            <Tab.Screen name="Housing" component={HousingScreen} />
            <Tab.Screen name="Review" component={EmojiFeedbackPage} />
        </Tab.Navigator>
    );
}



//creating the bottom navigation bar object
/*const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return ( 

        //creating the three tabs with the functions of our application
        <Tab.Navigator>
            <Tab.Screen name= "Map" component = {MapScreen} />
            <Tab.Screen name="Schooling" component = {SchoolingScreen}/>
            <Tab.Screen name="Housing" component = {HousingScreen}/>
            <Tab.Screen name="Review" component = {EmojiFeedback}/>
        </Tab.Navigator>
    );
}
*/