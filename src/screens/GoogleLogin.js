import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { SafeAreaView, View, Text } from 'react-native';

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
  
  export const FIREBASE_APP = initializeApp(firebaseConfig);
  export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
  export const FIREBASE_DB = getFirestore(FIREBASE_APP);

  const Login = () => {
    
  }
  export default Login;

  