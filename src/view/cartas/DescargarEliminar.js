import React, { useState, useEffect, useContext } from 'react';
import { View, Alert, Dimensions } from 'react-native';
import { Center, Text, useToast, Icon, Button } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import { API_URL } from "@env";
import Pdf from 'react-native-pdf';
import { AuthContext } from "../../service/AuthContext";

export default function DescargarEliminar({ navigation, route }) {
  const { estado, archivo, id, carta_nombre, carta } = route.params;
  const [cargando, setcargando] = useState(false);
  const [cargandoD, setcargandoD] = useState(false);
  const toast = useToast();
  const [urlCarta, seturlCarta] = useState(null);
  const { userId, userToken, } = useContext(AuthContext);


  // funcion para ver carta descargado
  const verCartaDescargado = () => {

    Alert.alert(
      'El archivo se ha descargado correctamente.',
      'Ubicación: ' + urlCarta,
      [
        { text: 'Ok', onPress: () => console.log('') }, // Abrir el archivo descargado
        // { text: 'Cancelar', onPress: () => console.log('Cancelado') } 
      ],
      { cancelable: false }
    );
  }

  // Función para descargar el archivo
  const descargarCarta = () => {
    setcargandoD(true);
    const fileUrl = carta;
    const destPath = RNFetchBlob.fs.dirs.DownloadDir + '/' + carta_nombre; // Asegúrate de incluir '/' entre DownloadDir y el nombre del archivo

    RNFetchBlob.config({
      fileCache: true,
      path: destPath,
    })
      .fetch('GET', fileUrl)
      .then((res) => {
        // console.log('Archivo descargado:', res.path());
        seturlCarta(res.path());
        console.log(res.path())

      })
      .catch((error) => {
        console.error('Error al descargar archivo:', error);
        toast.show({ 'description': 'Error al descargar el archivo' });
      })
      .finally(() => {
        setcargandoD(false);
      });
  };

  useEffect(() => {
    descargarCarta()
  }, [])


  const confirmarEliminarCarta = () => {

    Alert.alert(
      'Confirmación.',
      'Está seguro de eliminar ' + carta_nombre,
      [
        { text: 'Si', onPress: () => eliminarCarta() }, // Abrir el archivo descargado
        { text: 'Cancelar', onPress: () => console.log('Cancelado') }
      ],
      { cancelable: false }
    );
  }

  // Función para eliminar la carta
  const eliminarCarta = async () => {

    setcargando(true);
    try {
      const res = await fetch(API_URL + "eliminar-carta", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        })
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        Object.entries(data.errors).forEach(([key, value]) => {
          toast.show({ 'description': value.toString() });
        });
      }
      if (data.success) {
        toast.show({ 'description': data.success });
        navigation.navigate({
          name: 'Inicio',
          params: { estado: (Math.random() + 1).toString(36).substring(7) }
        });
      }
    } catch (error) {
      console.error('Error al eliminar carta:', error);
      toast.show({ 'description': 'Error al eliminar la carta' });
    } finally {
      setcargando(false);
    }
  };

  return (
    <Center flex={1}>

      {
        urlCarta ? (
          <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 0,
          }}
          >
            <Pdf
              source={{ uri: urlCarta }}
              onLoadComplete={(numberOfPages, filePath) => {
                // console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                // console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                // console.log(error);
              }}
              onPressLink={(uri) => {
                // console.log(`Link pressed: ${uri}`);
              }}
              style={{
                flex: 1,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
              }}
            />
          </View>
        ) : (
          <View><Text>Cargando carta..</Text></View>
        )
      }


      <View>
        {
          urlCarta ? (
            <Button
              mt="2"
              onPress={verCartaDescargado}
              isLoading={cargandoD}
              isLoadingText="Descargando"
              colorScheme={cargandoD ? 'secondary' : 'primary'}
              variant="solid"
              leftIcon={<Icon as={Ionicons} name="download" size="sm" />}
            >
              Descargar carta PDF
            </Button>
          ) : (
            <></>
          )
        }

        <Button
          my="2"
          onPress={confirmarEliminarCarta}
          isLoading={cargando}
          isLoadingText="Eliminando"
          colorScheme={cargando ? 'secondary' : 'danger'}
          variant="solid"
          leftIcon={<Icon as={Ionicons} name="trash" size="sm" />}
        >
          Eliminar carta
        </Button>
      </View>
    </Center>
  );
}
