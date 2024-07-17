import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Pressable, Icon } from 'native-base';
import Index from '../inicio/Index';
import { API_NAME } from "@env";
import Perfil from '../auth/Perfil';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Presentacion from '../cartas/Presentacion';
import Contestacion from '../cartas/Contestacion';
import Agradecimiento from '../cartas/Agradecimiento';
import Iniciada from '../cartas/Iniciada';
import DescargarEliminar from '../cartas/DescargarEliminar';

const HomeStack = createNativeStackNavigator();


export default function InicioStack({navigation,params}) {
  
    return (
        <HomeStack.Navigator screenOptions={{ 
          headerStyle: {
            backgroundColor: '#0369a1',
          },
          headerTintColor: '#fff',
         }} >
          <HomeStack.Screen name="Inicio" component={Index} options={{ 
            title:API_NAME,
            headerRight:()=>(
              <Pressable onPress={()=>navigation.navigate('Perfil')}>
                 <Icon as={FontAwesome} name="user" size={6} color="white"></Icon>
              </Pressable>
            )
           }} />
          <HomeStack.Screen name="Perfil" component={Perfil} />
          <HomeStack.Screen name="Presentacion" component={Presentacion} />
          <HomeStack.Screen name="Contestacion" component={Contestacion} />
          <HomeStack.Screen name="Agradecimiento" component={Agradecimiento} />
          <HomeStack.Screen name="Iniciada" component={Iniciada} />
          <HomeStack.Screen name="DescargarEliminar" options={{ 
            title:"Descargar o Eliminar"
           }} component={DescargarEliminar} />
          
        </HomeStack.Navigator>
      );
}
