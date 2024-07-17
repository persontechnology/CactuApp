import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from '../acerca/Inicio';
import { API_NAME } from "@env";

const AcercaTabStack = createNativeStackNavigator();

export default function AcercaStack() {
  return (
    <AcercaTabStack.Navigator screenOptions={{ 
        headerStyle: {
          backgroundColor: '#0369a1',
        },
        headerTintColor: '#fff',
       }} >
        <AcercaTabStack.Screen name="InicioAcerca" component={Inicio} options={{ 
            title:API_NAME
           }} />
      </AcercaTabStack.Navigator>
  )
}
