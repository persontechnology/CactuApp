import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import InicioStack from './stack/InicioStack';
import AcercaStack from './stack/AcercaStack';




const Tab = createBottomTabNavigator();

export default function TabHome() {
  return (
    <>
    <StatusBar translucent backgroundColor="transparent" />
      <Tab.Navigator screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#0369a1',
       }}>
        <Tab.Screen name="TabHome" component={InicioStack} options={{ 
          tabBarLabel:"Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
         }} />
        
         <Tab.Screen name="TabAcerca" component={AcercaStack} options={{ 
          tabBarLabel:"Acerca",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="infocirlce" color={color} size={size} />
          )
         }}/>
      </Tab.Navigator>
      </>
  );
}
