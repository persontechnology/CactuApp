import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken()
  }
}

const getFCMToken = async () => {
    let value = await AsyncStorage.getItem('fcmtoken');
    console.log(value,"este es el token")

    if (!value) {
        try {
      
           const value=await messaging().getToken();
            if(value){
                console.log(value,"new token")
                await AsyncStorage.setItem('fcmtoken', value);
            }
          
        } catch (e) {
          console.log("error en fcmtoken")
        }
    }

    
};

export const NotificacionListener=() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().onMessage(async remoteMessage=> {
        console.log(JSON.stringify(remoteMessage))
    })
};