import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";   
import MapScreen from '../screens/map.js';
import SchoolingScreen from '../screens/schooling.js';
import HousingScreen from '../screens/housing.js';
import EmojiFeedback from '../screens/emoji.js';



//creating the bottom navigation bar object
const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    return ( 

        //creating the three tabs with the functions of our application
        <Tab.Navigator>
            <Tab.Screen name= "Map" component = {MapScreen} />
            <Tab.Screen name="Schooling" component = {SchoolingScreen}/>
            <Tab.Screen name="Housing" component = {HousingScreen}/>
            <Tab.Screen name="User Review" component = {EmojiFeedback}/>
        </Tab.Navigator>
    );
}


