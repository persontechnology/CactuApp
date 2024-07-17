import { Box, Link, Center, FormControl, WarningOutlineIcon, Input, ScrollView, VStack, Pressable, Avatar, Text, useToast, Button, Icon, View, HStack, CheckIcon } from 'native-base'
import React, { useState, useContext, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from "../../service/AuthContext";
import { API_URL } from "@env";
import ReactNativeBlobUtil from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Agradecimiento({ navigation, route }) {
    const { estado, archivo, id, tipo_carta_nombre } = route.params;
    const { userId, userToken, } = useContext(AuthContext);
    const [cargando, setcargando] = useState(false);
    const toast = useToast();
    useEffect(() => {
        navigation.setOptions({ title: "Carta de " + tipo_carta_nombre })
    }, []);


    
    const [fotoPersonal, setfotoPersonal] = useState("https://cdn-icons-png.flaticon.com/128/2535/2535804.png");
    const [fotoPersonalBase, setfotoPersonalBase] = useState('');
    const [nombre_patrocinador, setnombre_patrocinador] = useState('')
    const [agradezco_por, setagradezco_por] = useState('')
    const [te_cuento_que, sette_cuento_que] = useState('')
    const [pregunta_al_patrocinador, setpregunta_al_patrocinador] = useState('')
    const [regalo_usar_para, setregalo_usar_para] = useState('')
    const [texto, settexto] = useState('');




    const cargarDatosGuardados = async () => {
        try {
          const savedData = await AsyncStorage.getItem("formDataAgradecimiento");
          if (savedData) {
            const formData = JSON.parse(savedData);
            // Setear los valores de los inputs con los datos cargados
            setnombre_patrocinador(formData.nombre_patrocinador || "");
            setagradezco_por(formData.agradezco_por || "");
            sette_cuento_que(formData.te_cuento_que || "");
            setpregunta_al_patrocinador(formData.pregunta_al_patrocinador || "");
            setregalo_usar_para(formData.regalo_usar_para || "");
            settexto(formData.texto || "");

          }
        } catch (error) {
          console.log("Error cargando datos:", error);
        }
      };

    useEffect(() => {
        cargarDatosGuardados();
    }, []);

    const handleInputChange = (setter, value) => {
        setter(value);
        AsyncStorage.setItem("formDataAgradecimiento", JSON.stringify({
            nombre_patrocinador,
            agradezco_por,
            te_cuento_que,
            pregunta_al_patrocinador,
            regalo_usar_para,
            texto
        }));
    };



    async function tomarFotoPersonal() {
        try {
            await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: true
            }).then(image => {
                setfotoPersonal(image.path)
                setfotoPersonalBase(image.data)
            });
        } catch (error) {

        }
    }


    function validar() {
        var estado = true;
        if (
            nombre_patrocinador.length === 0 ||
            agradezco_por.length === 0 ||
            te_cuento_que.length === 0 ||
            pregunta_al_patrocinador.length === 0 ||
            fotoPersonalBase.length === 0 ||
            texto.length === 0 ||
            regalo_usar_para.length === 0
        ) {
            estado = false;
        }
        return estado;
    }
    


    const acceder = async () => {
        if (validar()) {
            setcargando(true);

            try {
                const res = await ReactNativeBlobUtil.fetch('POST', API_URL + "responder-carta-agradecimiento", {
                    'Authorization': `Bearer ${userToken}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'multipart/form-data',
                }, [
                    // element with property `filename` will be transformed into `file` in form data
                    { name: 'ninio_id', data: userId.toString() },
                    { name: 'id', data: id.toString() },
                    { name: 'imagen', filename: 'personal.png', data: fotoPersonalBase },
                    { name: 'detalle', data: texto.toString() },
                    { name: 'nombre_patrocinador', data: nombre_patrocinador.toString() },
                    { name: 'agradezco_por', data: agradezco_por.toString() },
                    { name: 'te_cuento_que', data: te_cuento_que.toString() },
                    { name: 'pregunta_al_patrocinador', data: pregunta_al_patrocinador.toString() },
                    { name: 'regalo_usar_para', data: regalo_usar_para.toString() },
                    
                ]);
                const result = await res.json();
                console.log(result)
                if (result.errors) {
                    var errores = "";
                    Object.entries(result.errors).forEach(([key, value]) => {
                        errores += value.toString();
                    });
                    toast.show({ 'description': errores });
                }

                if (result.error) {
                    toast.show({ 'description': result.error });
                }

                if (result.info) {
                    toast.show({ 'description': result.info });
                }

                if (result.success) {
                    await AsyncStorage.removeItem("formDataAgradecimiento");
                    toast.show({ 'description': result.success });
                    navigation.navigate({
                        name: 'Inicio',
                        params: { estado: (Math.random() + 1).toString(36).substring(7) }
                    })
                }

            } catch (error) {
                toast.show({ 'description': error.toString() })
            } finally {
                setcargando(false);
            }
        } else {
            toast.show({ 'description': 'Complete datos.' })
        }
    }


    return (
        <Center flex={1}>
            {
                estado === 'Respondida' ? (
                    <View>
                        <HStack space={2} my={3}>
                            
                            <Text color="emerald.500" fontSize="md">
                                Carta ya fue respondida.!
                            </Text>
                        </HStack>
                        <Button onPress={() => navigation.goBack()} colorScheme={"success"} leftIcon={<Icon as={Ionicons} name="home" size="sm" />}>
                            Regresar
                        </Button>

                    </View>
                ) : (
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="white">

                        <Box mx={3} minWidth="95%">
                            {
                                archivo != 'no' ? <Link mt={4} href={archivo}>
                                    Click aquí para descargar archivo de patrocinador.
                                </Link> : <></>
                            }
                            <FormControl >
                                <FormControl.Label>Ingresa el nombre de tu patrocinador</FormControl.Label>
                                <Input onChangeText={(value) => handleInputChange(setnombre_patrocinador, value)} value={nombre_patrocinador}  placeholder="" />
                            </FormControl>

                            <FormControl >
                                <FormControl.Label>Agradezco por el valor enviado de:</FormControl.Label>
                                <Input keyboardType='number-pad' onChangeText={(value) => handleInputChange(setagradezco_por, value)} value={agradezco_por} placeholder="" />
                            </FormControl>

                            <FormControl >
                                <FormControl.Label>Tu regalo lo voy a usar para</FormControl.Label>
                                <Input onChangeText={(value) => handleInputChange(setregalo_usar_para, value)} value={regalo_usar_para} placeholder="" />
                            </FormControl>

                            <FormControl >
                                <FormControl.Label>Te cuento que</FormControl.Label>
                                <Input onChangeText={(value) => handleInputChange(sette_cuento_que, value)} value={te_cuento_que} placeholder="" />
                            </FormControl>

                            <FormControl >
                                <FormControl.Label>Es hora de hacer una pregunta a tu patrocinador</FormControl.Label>
                                <Input onChangeText={(value) => handleInputChange(setpregunta_al_patrocinador, value)} value={pregunta_al_patrocinador} placeholder="" />
                            </FormControl>

                            <FormControl>
                                <FormControl.Label>Redacte aquí tu despedida, no te olvides de poner  tu nombre</FormControl.Label>
                                <Input numberOfLines={5} value={texto} onChangeText={(value) => handleInputChange(settexto, value)}  multiline={true} editable={true} placeholder="" />
                               
                            </FormControl>
                            <Center>
                                <VStack space={5} my={2}>
                                    <Pressable onPress={tomarFotoPersonal}>
                                        <Box>
                                            <Center>
                                                <Avatar bg="green.500" source={{
                                                    uri: fotoPersonal
                                                }}>
                                                </Avatar>
                                                <Text>{"Foto"}</Text>
                                            </Center>
                                        </Box>

                                    </Pressable>
                                </VStack>
                            </Center>
                            <Button mt="2" onPress={acceder} isLoading={cargando} isLoadingText="Enviando" colorScheme={cargando ? 'secondary' : 'success'} variant={"solid"} leftIcon={
                                
                                <Icon as={Ionicons} name="mail" size="sm" />
                            }>
                                Enviar respuesta
                            </Button>


                            

                        </Box>
                    </ScrollView>
                )
            }
        </Center>
    )
}
