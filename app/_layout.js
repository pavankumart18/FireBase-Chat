import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

import {Slot, useSegments,useRouter} from "expo-router";

import "../global.css"
import { AuthContextProvider ,useAuth} from '../context/authContext';
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout = () => {
  const {isAuthenticated} = useAuth();
  const segements = useSegments();
  const router = useRouter();

  useEffect(() => {

    // if user is not authenticated, redirect to the signin page
    if (typeof isAuthenticated === "undefined"){
      return;
    }
    const inApp = segements[0] === "(app)";
    if (isAuthenticated && !inApp){
      // redirect to the Home page
      router.replace('(app)/home')
    }else if (isAuthenticated==false){
      // redirect to the Signin page
      router.replace('signIn')
    }

  }, [isAuthenticated])


  return <Slot />
}


export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
    
  )
}
