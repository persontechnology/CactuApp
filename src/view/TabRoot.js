import React, { useContext, useState, useEffect } from 'react';
import { Button, Text, View,Image,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome,MaterialCommunityIcons} from "@native-base/icons";
import HomeScreen from './HomeScreen';
import { AuthContext } from "../service/AuthContext";
import { API_URL } from "@env";
import { useToast,Icon } from 'native-base';
import DetailsScreen from './DetailsScreen';
import PresentacionScreen from './PresentacionScreen';


const {width, height} = Dimensions.get('screen');

function LogoTitle() {
  return (
    <Image
      style={{ width: (width*0.5*0.6), height: (height*0.2*0.2), }}
      source={require('../public/img/2.png')}
    />
  );
}


function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ 
        headerTitle:(props)=><LogoTitle {...props} />,
        headerRight: () => (
          <Icon as={FontAwesome} color="success.900" name="user-o"   onPress={()=>alert('ok')} size={5} />
        ),
        }} />
      <HomeStack.Screen name="Presentacion" component={PresentacionScreen} options={{ 
        title:"Presentación"
       }}/>
      <HomeStack.Screen name="Details" component={DetailsScreen} options={{ 
        title:"Detalle de la carta"
       }}/>
       
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function TabRoot() {

  const { userId, userToken } = useContext(AuthContext);
  const toast = useToast();
  const [data, setdata] = useState(0)

  const acceder = async () => {

    try {
      const res = await fetch(API_URL + "listar-mis-cartas", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({
          userId
        })
      });
      const result = await res.json();
      if (result.data) {
        setdata(result.data.length)

      }

    } catch (error) {
      toast.show({ 'description': error.toString() })
    } finally {

    }
  }

  useEffect(() => {
    acceder();

  }, [])


  return (

    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#166534',
    }}>
      <Tab.Screen name="TabHome" component={HomeStackScreen} options={{
        tabBarLabel: 'Inicio',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
        tabBarBadge: data
      }}
      />
      <Tab.Screen name="TabSettings" component={SettingsStackScreen} options={{
        tabBarLabel: 'Respuestas',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),
        tabBarBadge: 3,
      }} />
    </Tab.Navigator>

  );
}
