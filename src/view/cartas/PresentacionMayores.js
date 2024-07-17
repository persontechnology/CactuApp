import React, { useState, useEffect, useContext } from "react";
import { FormControl, Icon, Avatar, useToast, Input, HStack, Text, Divider, Box, WarningOutlineIcon, ScrollView, Center, NativeBaseProvider, Heading, Button, View, Pressable } from "native-base";
import ReactNativeBlobUtil from 'react-native-blob-util';
import { AuthContext } from "../../service/AuthContext";
import { API_URL } from "@env";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PresentacionMayores({navigation, params }) {

    const { userId, userToken } = useContext(AuthContext);

    const [cargando, setcargando] = useState(false);
    const toast = useToast();

    const [hola, sethola] = useState('');
    const [soy, setsoy] = useState('');
    const [meDicen, setmeDicen] = useState('');
    const [edad, setedad] = useState('');
    const [miMejorAmigo, setmiMejorAmigo] = useState('');
    const [esMejorAmigo, setesMejorAmigo] = useState('');
    const [loquehago, setloquehago] = useState('');
    const [miSueno, setmiSueno] = useState('');
    const [dondeAprendo, setdondeAprendo] = useState('');
    const [gustaAprendes, setgustaAprendes] = useState('');
    const [mePaso, setmePaso] = useState('');
    const [meGustaria, setmeGustaria] = useState('');
    const [miFamilia, setmiFamilia] = useState('');
    const [nuestraPro, setnuestraPro] = useState('');
    const [idioma, setidioma] = useState('');
    const [lugarFavorito, setlugarFavorito] = useState('');
    const [comidaTipica, setcomidaTipica] = useState('');
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
          const savedData = await AsyncStorage.getItem("formDataPresentacionMayores");
          if (savedData) {
            const formData = JSON.parse(savedData);
            // Setear los valores de los inputs con los datos cargados
            sethola(formData.hola || "");
            setsoy(formData.soy || "");
            setmeDicen(formData.meDicen || "");
            setedad(formData.edad || "");
            setmiMejorAmigo(formData.miMejorAmigo || "");
            setesMejorAmigo(formData.esMejorAmigo || "");
            setloquehago(formData.loquehago || "");
            setmiSueno(formData.miSueno || "");
            setdondeAprendo(formData.dondeAprendo || "");
            setgustaAprendes(formData.gustaAprendes || "");
            setmePaso(formData.mePaso || "");
            setmeGustaria(formData.meGustaria || "");
            setmiFamilia(formData.miFamilia || "");
            setnuestraPro(formData.nuestraPro || "");
            setidioma(formData.idioma || "");
            setlugarFavorito(formData.lugarFavorito || "");
            setcomidaTipica(formData.comidaTipica || "");
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
        AsyncStorage.setItem("formDataPresentacionMayores", JSON.stringify({
            hola,
            soy,
            meDicen,
            edad,
            miMejorAmigo,
            esMejorAmigo,
            loquehago,
            miSueno,
            dondeAprendo,
            gustaAprendes,
            mePaso,
            meGustaria,
            miFamilia,
            nuestraPro,
            idioma,
            lugarFavorito,
            comidaTipica,
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
            soy.length === 0 ||
            meDicen.length === 0 ||
            edad.length === 0 ||
            miMejorAmigo.length === 0 ||
            esMejorAmigo.length === 0 ||
            loquehago.length === 0 ||
            miSueno.length === 0 ||
            dondeAprendo.length === 0 ||
            gustaAprendes.length === 0 ||
            mePaso.length === 0 ||
            meGustaria.length === 0 ||
            miFamilia.length === 0 ||
            nuestraPro.length === 0 ||
            idioma.length === 0 ||
            lugarFavorito.length === 0 ||
            comidaTipica.length === 0 ||
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
        if (validar()) {
            setcargando(true);

            try {
                const res=await ReactNativeBlobUtil.fetch('POST', API_URL+"responder-carta-presentacion-mayores", {
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
                    {name:'soy',data:soy.toString()},
                    {name:'meDicen',data:meDicen.toString()},
                    {name:'edad',data:edad.toString()},
                    {name:'miMejorAmigo',data:miMejorAmigo.toString()},
                    {name:'esMejorAmigo',data:esMejorAmigo.toString()},
                    {name:'loquehago',data:loquehago.toString()},
                    {name:'miSueno',data:miSueno.toString()},
                    {name:'dondeAprendo',data:dondeAprendo.toString()},
                    {name:'gustaAprendes',data:gustaAprendes.toString()},
                    {name:'mePaso',data:mePaso.toString()},
                    {name:'meGustaria',data:meGustaria.toString()},
                    {name:'miFamilia',data:miFamilia.toString()},
                    {name:'nuestraPro',data:nuestraPro.toString()},
                    {name:'idioma',data:idioma.toString()},
                    {name:'lugarFavorito',data:lugarFavorito.toString()},
                    {name:'comidaTipica',data:comidaTipica.toString()},
                    {name:'comer',data:comer.toString()},
                    {name:'masMeGusta',data:masMeGusta.toString()},
                    {name:'pregunta',data:pregunta.toString()},
                    {name:'despedida',data:despedida.toString()},
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
                    await AsyncStorage.removeItem("formDataPresentacionMayores");
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
            toast.show({ 'description': 'Complete datos.' })
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

                <Input onChangeText={(value) => handleInputChange(sethola, value)} value={hola} placeholder="" />

            </FormControl>

            <FormControl >
                <FormControl.Label>Soy</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setsoy, value)}  value={soy} placeholder="" />
                
            </FormControl>

            <FormControl >
                <FormControl.Label>y mis amigos me dicen</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setmeDicen, value)} value={meDicen} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>la edad que tengo es</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setedad, value)} value={edad} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Mi mejor amigo se llama</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setmiMejorAmigo, value)} value={miMejorAmigo} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>es mi mejor amigo porque,</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setesMejorAmigo, value)} value={esMejorAmigo} multiline={true} placeholder="" />
              
            </FormControl>

            <FormControl >
                <FormControl.Label>Lo que maś me gusta hacer es,</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setloquehago, value)} value={loquehago} multiline={true} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Cuando sea grande mi sueño es,</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setmiSueno, value)} value={miSueno} multiline={true} placeholder="" />
              
            </FormControl>

            <FormControl >
                <FormControl.Label>El lugar donde aprendo es,</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setdondeAprendo, value)} value={dondeAprendo} multiline={true} placeholder="" />
               
            </FormControl>

            <FormControl >
                <FormControl.Label>lo que me gusta aprender es,</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setgustaAprendes, value)} value={gustaAprendes} multiline={true} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Lo más importante que me pasó últimamente es</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setmePaso, value)} value={mePaso} multiline={true} placeholder="" />
              
            </FormControl>

            <FormControl >
                <FormControl.Label>Lo que me gustaría aprender en el programa de ChildFund es</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setmeGustaria, value)} value={meGustaria} multiline={true} placeholder="" />
                
            </FormControl>

            <FormControl >
                <FormControl.Label>Esta es mi famila</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setmiFamilia, value)} value={miFamilia} multiline={true} placeholder="" />
               
            </FormControl>

            <Heading size={"sm"} mt="3">También quiero contarte del lugar donde vivo</Heading>

            <FormControl >
                <FormControl.Label>Nuestra provincia se llama</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setnuestraPro, value)} value={nuestraPro} placeholder="" />
              
            </FormControl>

            <FormControl>
                <FormControl.Label>y el idioma que hablamos es</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setidioma, value)} value={idioma} placeholder="" />
                
            </FormControl>

            <Heading size={"sm"} mt="3">Donde nosotros vivimos hay sitios muy hermosos,</Heading>

            <FormControl >
                <FormControl.Label>mi lugar favorito es</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setlugarFavorito, value)} value={lugarFavorito} placeholder="" />
               
            </FormControl>

            <Heading size={"sm"} mt="3">También tenemos comida típica, por ejemplo,</Heading>

            <FormControl>
                <FormControl.Label>la comida típica es</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setcomidaTipica, value)} value={comidaTipica} placeholder="" />
               
            </FormControl>

            <FormControl >
                <FormControl.Label>y a mi me gusta comer</FormControl.Label>
                <Input onChangeText={(value) => handleInputChange(setcomer, value)} value={comer} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>De nuestras tradiciones, lo que más me gusta es</FormControl.Label>
                <Input multiline onChangeText={(value) => handleInputChange(setmasMeGusta, value)} value={masMeGusta} placeholder="" />
               
            </FormControl>

            <FormControl >
                <FormControl.Label>Me gustaría hacerte una pregunta</FormControl.Label>
                <Input multiline onChangeText={(value) => handleInputChange(setpregunta, value)} value={pregunta} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Cuéntale por qué quisieras que te conteste tu patrocinador, envíale un mensaje de despedida</FormControl.Label>
                <Input multiline onChangeText={(value) => handleInputChange(setdespedida, value)} value={despedida} placeholder="" />
               
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

            <Button mt="2" onPress={acceder} isLoading={cargando} isLoadingText="Enviando" colorScheme={cargando ? 'secondary' : 'success'} variant={"solid"} leftIcon={
                <Icon as={Ionicons} name="mail" size="sm" />
            }>
                Enviar respuesta
            </Button>

            <Divider />
        </Box>

    </ScrollView>;
};
