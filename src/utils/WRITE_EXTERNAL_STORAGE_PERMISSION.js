import { View, Text } from 'react-native'
import React from 'react'
import { PermissionsAndroid } from 'react-native';

export async function WRITE_EXTERNAL_STORAGE_PERMISSION() {
    // WRITE_EXTERNAL_STORAGE
    try {
        const granted_w = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title: 'Permiso para escribir en el almacenamiento',
            message: 'Esta aplicación necesita acceso a tu almacenamiento para descargar archivos',
            buttonNeutral: 'Preguntarme más tarde',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
        }
        )
        if (granted_w === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("ALAMACENAMIENTO LISTO PARA USAR")

        } else {
        console.log("ALMACENAMIENTO DENEGADA")

        }
    } catch (err) {
        console.warn(err)
    }
}