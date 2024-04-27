import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigation from './src/navigation/bottomTabNavigation';
import { initializeApp } from '@firebase/app';
import { getDatabase } from '@firebase/database';



//Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyDF_w-f-b_ZKAxUbONooq9sj3DyeOXGbmg",
  authDomain: "vigilantenyc-1c10f.firebaseapp.com",
  databaseURL: "https://vigilantenyc-1c10f-default-rtdb.firebaseio.com",
  projectId: "vigilantenyc-1c10f",
  storageBucket: "vigilantenyc-1c10f.appspot.com",
  messagingSenderId: "303549061074",
  appId: "1:303549061074:web:44d50628c07e9de75cda0b",
  measurementId: "G-C9YRENCTEP"
};


initializeApp(firebaseConfig);
const db = getDatabase();


export default function App()
{
  return(
    <NavigationContainer>
      <BottomTabNavigation database={db}  />
    </NavigationContainer>
  );
}

