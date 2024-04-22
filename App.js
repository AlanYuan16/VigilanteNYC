import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from './src/navigation/bottomTabNavigation';

export default function App()
{
  return(
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  );
}