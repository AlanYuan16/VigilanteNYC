import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/map.js';
import SchoolingScreen from '../screens/schooling.js';
import HousingScreen from '../screens/housing.js';
import Test from '../screens/componentTest.js';

const Tab = createBottomTabNavigator();

const CustomBottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Schooling" component={SchoolingScreen} />
      <Tab.Screen name="Housing" component={HousingScreen} />
      <Tab.Screen name="Test" component={Test} />
    </Tab.Navigator>
  );
};

export default CustomBottomTabNavigator;

