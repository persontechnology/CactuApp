import React, { useState, useEffect, useContext } from "react";
import { FormControl, Icon, Avatar, useToast, Input, HStack, Text, Divider, Box, WarningOutlineIcon, ScrollView, Center, NativeBaseProvider, Heading, Button, View, Pressable } from "native-base";
import ReactNativeBlobUtil from 'react-native-blob-util';
import { AuthContext } from "../../service/AuthContext";
import { API_URL } from "@env";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PresentacionMenores({navigation, params }) {

    const { userId, userToken } = useContext(AuthContext);
    const [op, setop] = useState('menor');
    const [cargando, setcargando] = useState(false);
    const toast = useToast();

    const [hola, sethola] = useState('');
    const [escribo, setescribo] = useState('');
    const [mi, setmi] = useState('');
    const [queel, setqueel] = useState('');
    const [cumple, setcumple] = useState('');
    const [noSabe, setnoSabe] = useState('');
    const [ademas, setademas] = useState('');
    const [leGusta, setleGusta] = useState('');
    const [dondeAprendo, setdondeAprendo] = useState('');
    const [gustaAprendes, setgustaAprendes] = useState('');
    const [mePaso, setmePaso] = useState("");
    const [meGustaria, setmeGustaria] = useState('');
    const [miNombre, setmiNombre] = useState('');
    const [ysoy, setysoy] = useState('');
    const [de, setde] = useState('');
    const [mifamilia, setmifamilia] = useState('');
    const [nuestraPro, setnuestraPro] = useState('');
    const [idioma, setidioma] = useState('');
    const [lugarFavorito, setlugarFavorito] = useState('');
    const [comidaTipica, setcomidaTipica] = useState('');
    const [ya, setya] = useState('');
    const [comer, setcomer] = useState('');
    const [masMeGusta, setmasMeGusta] = useState('');
    const [pregunta, setpregunta] = useState('');
    const [despedida, setdespedida] = useState(''); 

    const [fotoPersonal, setfotoPersonal] = useState("https://cdn-icons-png.flaticon.com/128/2535/2535804.png");
    const [fotoFamiliar, setfotoFamiliar] = useState("https://cdn-icons-png.flaticon.com/128/2535/2535804.png");
    const [fotoPersonalBase, setfotoPersonalBase] = useState('');
    const [fotoFamiliarBase, setfotoFamiliarBase] = useState('');

    

    const cargarDatosGuardados = async () => {
        try {
          const savedData = await AsyncStorage.getItem("formDataPresentacionMenores");
          if (savedData) {
            const formData = JSON.parse(savedData);
            // Setear los valores de los inputs con los datos cargados
            sethola(formData.hola || "");
            setescribo(formData.escribo || "");
            setmi(formData.mi || "");
            setqueel(formData.queel || "");
            setcumple(formData.cumple || "");
            setnoSabe(formData.noSabe || "");
            setademas(formData.ademas || "");
            setleGusta(formData.leGusta || "");
            setdondeAprendo(formData.dondeAprendo || "");
            setgustaAprendes(formData.gustaAprendes || "");
            setmePaso(formData.mePaso || "");
            setmeGustaria(formData.meGustaria || "");
            setmiNombre(formData.miNombre || "");
            setysoy(formData.ysoy || "");
            setde(formData.de || "");
            setmifamilia(formData.mifamilia || "");
            setnuestraPro(formData.nuestraPro || "");
            setidioma(formData.idioma || "");
            setlugarFavorito(formData.lugarFavorito || "");
            setcomidaTipica(formData.comidaTipica || "");
            setya(formData.ya || "");
            setcomer(formData.comer || "");
            setmasMeGusta(formData.masMeGusta || "");
            setpregunta(formData.pregunta || "");
            setdespedida(formData.despedida || "");
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
        AsyncStorage.setItem("formDataPresentacionMenores", JSON.stringify({
            hola,
            escribo,
            mi,
            queel,
            cumple,
            noSabe,
            ademas,
            leGusta,
            dondeAprendo,
            gustaAprendes,
            mePaso,
            meGustaria,
            miNombre,
            ysoy,
            de,
            mifamilia,
            nuestraPro,
            idioma,
            lugarFavorito,
            comidaTipica,
            ya,
            comer,
            masMeGusta,
            pregunta,
            despedida
        }));
    };
   

    function validar() {
        var estado = true;
        if (
            hola.length === 0 ||
            escribo.length === 0 ||
            mi.length === 0 ||
            queel.length === 0 ||
            cumple.length === 0 ||
            noSabe.length === 0 ||
            ademas.length === 0 ||
            leGusta.length === 0 ||
            dondeAprendo.length === 0 ||
            gustaAprendes.length === 0 ||
            mePaso.length === 0 ||
            meGustaria.length === 0 ||
            miNombre.length === 0 ||
            ysoy.length === 0 ||
            de.length === 0 ||
            mifamilia.length === 0 ||
            nuestraPro.length === 0 ||
            idioma.length === 0 ||
            lugarFavorito.length === 0 ||
            comidaTipica.length === 0 ||
            ya.length === 0 ||
            comer.length === 0 ||
            masMeGusta.length === 0 ||
            pregunta.length === 0 ||
            despedida.length === 0 ||
            fotoPersonalBase.length === 0 ||
            fotoFamiliarBase.length === 0
        ) {
            estado = false;
        }
        return estado;
    }
    
    const acceder = async () => {
        if (validar() ) {
            setcargando(true);

            try {
                const res=await ReactNativeBlobUtil.fetch('POST', API_URL+"responder-carta-presentacion-menores", {
                    'Authorization': `Bearer ${userToken}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'multipart/form-data',
                }, [
                    // element with property `filename` will be transformed into `file` in form data
                    {name: 'imagen', filename: 'personal.png', data: fotoPersonalBase},
                    {name: 'foto_familia', filename: 'familiar.png', data: fotoFamiliarBase},
                    {name:'userId',data:userId.toString()},
                    {name:'id',data:params.id.toString()},
                    {name:'hola',data:hola.toString()},
                    {name:'escribo',data:escribo.toString()},
                    {name:'mi',data:mi.toString()},
                    {name:'queel',data:queel.toString()},
                    {name:'cumple',data:cumple.toString()},
                    {name:'noSabe',data:noSabe.toString()},
                    {name:'ademas',data:ademas.toString()},
                    {name:'leGusta',data:leGusta.toString()},
                    {name:'dondeAprendo',data:dondeAprendo.toString()},
                    {name:'gustaAprendes',data:gustaAprendes.toString()},
                    {name:'mePaso',data:mePaso.toString()},
                    {name:'meGustaria',data:meGustaria.toString()},
                    {name:'miNombre',data:miNombre.toString()},
                    {name:'ysoy',data:ysoy.toString()},
                    {name:'de',data:de.toString()},
                    {name:'mifamila',data:mifamilia.toString()},
                    {name:'nuestraPro',data:nuestraPro.toString()},
                    {name:'idioma',data:idioma.toString()},
                    {name:'lugarFavorito',data:lugarFavorito.toString()},
                    {name:'comidaTipica',data:comidaTipica.toString()},
                    {name:'ya',data:ya.toString()},
                    {name:'comer',data:comer.toString()},
                    {name:'masMeGusta',data:masMeGusta.toString()},
                    {name:'pregunta',data:pregunta.toString()},
                    {name:'despedida',data:despedida.toString()}
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

                  if(result.info){
                    toast.show({ 'description': result.info });
                    navigation.goBack();
                  }

                  if(result.success){
                    await AsyncStorage.removeItem("formDataPresentacionMenores");
                    toast.show({ 'description': result.success })    
                    navigation.navigate({
                        name: 'Inicio',
                        params: { estado: (Math.random() + 1).toString(36).substring(7) }
                    })
                  }

            } catch (error) {
                toast.show({ 'description': error.toString() })
            }finally{
                setcargando(false);
            }            
        } else {
            toast.show({ 'description': 'Complete datos.',isClosable: true,variant: "solid", })
        }
    }

    async function tomarFotoFamiliar(){
         try {
            await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64:true
              }).then(image => {
                setfotoFamiliar(image.path)
                setfotoFamiliarBase(image.data)
              });
         } catch (error) {
            
         }

    }

    async function tomarFotoPersonal(){
        try {
           await ImagePicker.openCamera({
               width: 300,
               height: 400,
               cropping: true,
               includeBase64:true
             }).then(image => {
               setfotoPersonal(image.path)
               setfotoPersonalBase(image.data)
             });
        } catch (error) {
           
        }
   }

    return <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="white">

        <Box mx={3} minWidth="95%">
            <Heading size={"sm"} mt="3">Presentación </Heading>

            <FormControl >
                <FormControl.Label>Hola</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(sethola, value)}  value={hola} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Escribo a nombre de</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setescribo, value)} value={escribo} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>mi</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setmi, value)} value={mi} placeholder="" />
                
            </FormControl>

            <FormControl>
                <FormControl.Label>,que el</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setqueel, value)} value={queel} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Cumple</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setcumple, value)} value={cumple} placeholder="" />
              
            </FormControl>

            <FormControl>
                <FormControl.Label>de edad y aún no sabe escribir pero</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setnoSabe, value)} value={noSabe} placeholder="" multiline />
              
            </FormControl>

            <FormControl>
                <FormControl.Label>además a</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setademas, value)} value={ademas} placeholder="" />
              
            </FormControl>

            <FormControl>
                <FormControl.Label>le gusta</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setleGusta, value)} value={leGusta} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>El lugar  donde aprende es</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setdondeAprendo, value)} value={dondeAprendo} placeholder="" multiline />
              
            </FormControl>

            <FormControl>
                <FormControl.Label>En este  mes aprendimos</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setgustaAprendes, value)} value={gustaAprendes} placeholder="" multiline />
               
            </FormControl>


            <FormControl>
                <FormControl.Label>y lo más importante que nos pasó últimamente es</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setmePaso, value)} value={mePaso} placeholder="" multiline />
                
            </FormControl>

            <FormControl>
                <FormControl.Label>Lo que esperamos aprender con el programa de ChildFund es</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setmeGustaria, value)} value={meGustaria} placeholder="" multiline />
                
            </FormControl>

            <FormControl >
                <FormControl.Label>Mi nombre es</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setmiNombre, value)} value={miNombre} placeholder="" />
                
            </FormControl>

            <FormControl>
                <FormControl.Label>y soy</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setysoy, value)} value={ysoy} placeholder="" />
                
            </FormControl>

            <FormControl >
                <FormControl.Label>de</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setde, value)} value={de} placeholder="" />
               
            </FormControl>


            <FormControl >
                <FormControl.Label>Los otros miembros de nuestra familia son</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setmifamilia, value)} value={mifamilia} placeholder="" multiline />
               
            </FormControl>

            <FormControl >
                <FormControl.Label>Nosotros vivimos  en la provincia de</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setnuestraPro, value)} value={nuestraPro} placeholder="" multiline />
              
            </FormControl>


            <FormControl >
                <FormControl.Label>y el idioma que hablamos es</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setidioma, value)} value={idioma} placeholder="" />
               
            </FormControl>

            <FormControl >
                <FormControl.Label>Nuestra provincia tiene sitios muy hermosos, a nosotros nos gusta ir a</FormControl.Label>
                <Input onChangeText={setlugarFavorito} value={lugarFavorito} placeholder="" />
              
            </FormControl>


            <FormControl >
                <FormControl.Label>También tenemos comida típica, por ejemplo</FormControl.Label>
                <Input onChangeText={setcomidaTipica} value={comidaTipica} placeholder="" multiline />
                
            </FormControl>


            <FormControl >
                <FormControl.Label>y a</FormControl.Label>
                <Input onChangeText={setya} value={ya} placeholder="" />
                
            </FormControl>

            <FormControl>
                <FormControl.Label>le gusta</FormControl.Label>
                <Input onChangeText={setcomer} value={comer} placeholder="" />
                
            </FormControl>

            <FormControl >
                <FormControl.Label>De nuestras tradiciones, la que compartimos juntos es</FormControl.Label>
                <Input onChangeText={setmasMeGusta} value={masMeGusta} placeholder="" multiline />
               
            </FormControl>

            <FormControl >
                <FormControl.Label>Nos gustaría saber más sobre ti y tu familia y hacerles una pregunta</FormControl.Label>
                <Input onChangeText={setpregunta} value={pregunta} placeholder="" multiline/>
                
            </FormControl>

            <FormControl>
                <FormControl.Label>Cuéntale por qué quisieras que te conteste tu patrocinador, envíale un mensaje de despedida</FormControl.Label>
                <Input onChangeText={setdespedida} value={despedida} placeholder="" multiline/>
               
            </FormControl>

            <Center>
                <HStack space={5} my={2}>
                    <Pressable onPress={tomarFotoPersonal}>
                        <Box>
                            <Center>
                                <Avatar bg="green.500" source={{
                                    uri: fotoPersonal
                                }}>
                                    AJ
                                </Avatar>
                                <Text>{"Foto personal"}</Text>
                            </Center>
                        </Box>

                    </Pressable>

                    <Pressable onPress={tomarFotoFamiliar}>
                        <Box>
                            <Center>
                                <Avatar bg="green.500" source={{
                                    uri: fotoFamiliar
                                }}>
                                    AJ
                                </Avatar>
                                <Text>{"Foto familiar"}</Text>
                            </Center>
                        </Box>


                    </Pressable>
                </HStack>
            </Center>

            <Button my="2" onPress={acceder} isLoading={cargando} isLoadingText="Enviando" colorScheme={cargando ? 'secondary' : 'success'} variant={"solid"} leftIcon={
                <Icon as={Ionicons} name="mail" size="sm" />
            }>
                Enviar respuesta
            </Button>

            <Divider />
        </Box>

    </ScrollView>;
};
