import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './src/service/AuthContext';

import { NativeBaseProvider, Box } from "native-base";
import Acceder from './src/view/auth/Acceder';
import TabRoot from './src/view/TabRoot';
import IntroSlider from './src/view/IntroSlider';
import {StatusBar} from 'native-base';


function SplashScreen() {
  return (
    <View>
      <Text>Cargando...</Text>
    </View>
  );
}


const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            // extra
            userNombres:action.nombres,
            userId:action.id,
            userNumeroChild:action.numero_child,
            userRolesPermisos:action.roles_permisos
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            // extra
            userNombres:action.nombres,
            userId:action.id,
            userNumeroChild:action.numero_child,
            userRolesPermisos:action.roles_permisos
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
             // extra
             userNombres:null,
             userId:null,
             userNumeroChild:null,
             userRolesPermisos:null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      // extra
      userNombres:null,
      userId:null,
      userNumeroChild:null,
      userRolesPermisos:null
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      
      
      //extra
      let userNombres;
      let userId;
      let userNumeroChild;
      let userRolesPermisos;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
        userToken = await AsyncStorage.getItemAsync('userToken');
        userNombres = await AsyncStorage.getItem('userNombres');
        userNumeroChild = await AsyncStorage.getItem('userNumeroChild');
        userId = await AsyncStorage.getItem('userId');
        userRolesPermisos=await AsyncStorage.getItem('userRolesPermisos')
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ 
        type: 'RESTORE_TOKEN', 
        token: userToken,
        nombres:userNombres,
        numero_child:userNumeroChild,
        id:userId,
        roles_permisos:userRolesPermisos
       });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        
        // In a production app, we need to send some data (usually userNombres, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        let userToken=data.token;
        let userNombres=data.nombres;
        let userId=String(data.id);
        let userNumeroChild=data.numero_child;
        let userRolesPermisos=JSON.stringify(data.roles_permisos);
        
        try {
          
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userNumeroChild', userNombres);
          await AsyncStorage.setItem('userNombres', userNombres);
          await AsyncStorage.setItem('userId', userId);
          await AsyncStorage.setItem('userRolesPermisos',userRolesPermisos);
          dispatch({ 
            type: 'SIGN_IN', 
            token: userToken,
            numero_child:userNumeroChild,
            nombres:userNombres,
            id:userId,
            roles_permisos:userRolesPermisos
           });
        } catch (error) {
          console.log(error)
        }

      },
      signOut: async() => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userNumeroChild');
        await AsyncStorage.removeItem('userNombres');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userRolesPermisos');
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    
    <NativeBaseProvider>
    <AuthContext.Provider value={{ ...state,...authContext }}>
      <StatusBar translucent backgroundColor="#166534" />
        <NavigationContainer>
          
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Navigator>
                <Stack.Screen name="Splash" component={SplashScreen} />
              </Stack.Navigator>
            ) : state.userToken == null ? (
              // No token found, user isn't signed in
              <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#166534',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
              }}>
                <Stack.Screen
                  name="IntroSlider"
                  component={IntroSlider}
                  options={{
                    title: 'Ingresar',
                    headerShown:false,
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />

              <Stack.Screen
                  name="SignIn"
                  component={Acceder}
                  options={{
                    title: 'Acceder',
                   
                    // headerShown:false,
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />


              </Stack.Navigator>
            ) : (
              // User is signed in
              //<Stack.Screen name="Home" component={HomeScreen} />
              <TabRoot/>
            )}
          
        </NavigationContainer>
      
    </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
