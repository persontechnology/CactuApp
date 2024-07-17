import { PermissionsAndroid } from 'react-native';

export async function requestNotificationPermission() {
  
  
  // noticiaciones
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        'title': 'CACTU APP',
        'message': 'ACEPTAR NOTIFICACIONES'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("NOTIFICACION LISTO PARA USAR")

    } else {
      console.log("NOTIFICACION DENEGADA")

    }
  } catch (err) {
    console.warn(err)
  }


  


}