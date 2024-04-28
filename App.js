import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LoadingScreen from './src/screens/LoadingScreen.js';

import CustomBottomTabNavigator from './src/navigation/bottomTabNavigation.js';



export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading process (e.g., fetching data)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Change to actual loading process
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? <LoadingScreen /> : <CustomBottomTabNavigator/>}
    </NavigationContainer>
  );
}
