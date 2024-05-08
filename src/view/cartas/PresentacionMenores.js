import React, { useState, useEffect, useContext } from "react";
import { FormControl, Icon, Avatar, useToast, Input, HStack, Text, Divider, Box, WarningOutlineIcon, ScrollView, Center, NativeBaseProvider, Heading, Button, View, Pressable } from "native-base";
import ReactNativeBlobUtil from 'react-native-blob-util';
import { AuthContext } from "../../service/AuthContext";
import { API_URL } from "@env";
import { Entypo } from "@native-base/icons";
import ImagePicker from 'react-native-image-crop-picker';

export default function PresentacionMenores({navigation, params }) {

    const { userId, userToken } = useContext(AuthContext);
    const [op, setop] = useState('menor');
    const [cargando, setcargando] = useState(false);
    const toast = useToast();

    const [hola, sethola] = useState('ola');
    const [escribo, setescribo] = useState('ola');
    const [mi, setmi] = useState('ola');
    const [queel, setqueel] = useState('ola');
    const [cumple, setcumple] = useState('ola');
    const [noSabe, setnoSabe] = useState('ola');
    const [ademas, setademas] = useState('ola');
    const [leGusta, setleGusta] = useState('ola');
    const [dondeAprendo, setdondeAprendo] = useState('ola');
    const [gustaAprendes, setgustaAprendes] = useState('ola');
    const [mePaso, setmePaso] = useState("ola");
    const [meGustaria, setmeGustaria] = useState('ola');
    const [miNombre, setmiNombre] = useState('ola');
    const [ysoy, setysoy] = useState('ola');
    const [de, setde] = useState('ola');
    const [mifamilia, setmifamilia] = useState('ola');
    const [nuestraPro, setnuestraPro] = useState('ola');
    const [idioma, setidioma] = useState('ola');
    const [lugarFavorito, setlugarFavorito] = useState('ola');
    const [comidaTipica, setcomidaTipica] = useState('ola');
    const [ya, setya] = useState('ola');
    const [comer, setcomer] = useState('ola');
    const [masMeGusta, setmasMeGusta] = useState('ola');
    const [pregunta, setpregunta] = useState('ola');
    const [despedida, setdespedida] = useState('ola'); 

    const [fotoPersonal, setfotoPersonal] = useState("https://www.seekpng.com/png/full/50-500887_canton-of-lucerne.png");
    const [fotoFamiliar, setfotoFamiliar] = useState("https://www.seekpng.com/png/full/50-500887_canton-of-lucerne.png");
    const [fotoPersonalBase, setfotoPersonalBase] = useState('');
    const [fotoFamiliarBase, setfotoFamiliarBase] = useState('');


   

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
                <Input onChangeText={sethola} value={hola} placeholder="Ingresa el nombre a quién escribes." />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Escribo a nombre de</FormControl.Label>
                <Input onChangeText={setescribo} value={escribo} placeholder="Ingrese el nombre de quién representa" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>mi</FormControl.Label>
                <Input onChangeText={setmi} value={mi} placeholder="Ingrese el parentesco" />
                
            </FormControl>

            <FormControl>
                <FormControl.Label>,que el</FormControl.Label>
                <Input onChangeText={setqueel} value={queel} placeholder="fecha" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Cumple</FormControl.Label>
                <Input onChangeText={setcumple} value={cumple} placeholder="cuantos años" />
              
            </FormControl>

            <FormControl>
                <FormControl.Label>de edad y aún no sabe escribir pero</FormControl.Label>
                <Input onChangeText={setnoSabe} value={noSabe} placeholder="" multiline />
              
            </FormControl>

            <FormControl>
                <FormControl.Label>además a</FormControl.Label>
                <Input onChangeText={setademas} value={ademas} placeholder="" />
              
            </FormControl>

            <FormControl>
                <FormControl.Label>le gusta</FormControl.Label>
                <Input onChangeText={setleGusta} value={leGusta} placeholder="" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>El lugar  donde aprende es</FormControl.Label>
                <Input onChangeText={setdondeAprendo} value={dondeAprendo} placeholder="" multiline />
              
            </FormControl>

            <FormControl>
                <FormControl.Label>En este  mes aprendimos</FormControl.Label>
                <Input onChangeText={setgustaAprendes} value={gustaAprendes} placeholder="" multiline />
               
            </FormControl>


            <FormControl>
                <FormControl.Label>y lo más importante que nos pasó últimamente es</FormControl.Label>
                <Input onChangeText={setmePaso} value={mePaso} placeholder="" multiline />
                
            </FormControl>

            <FormControl>
                <FormControl.Label>Lo que esperamos aprender con el programa de ChildFund es</FormControl.Label>
                <Input onChangeText={setmeGustaria} value={meGustaria} placeholder="" multiline />
                
            </FormControl>

            <FormControl >
                <FormControl.Label>Mi nombre es</FormControl.Label>
                <Input onChangeText={setmiNombre} value={miNombre} placeholder="" />
                
            </FormControl>

            <FormControl>
                <FormControl.Label>y soy</FormControl.Label>
                <Input onChangeText={setysoy} value={ysoy} placeholder="" />
                
            </FormControl>

            <FormControl >
                <FormControl.Label>de</FormControl.Label>
                <Input onChangeText={setde} value={de} placeholder="" />
               
            </FormControl>


            <FormControl >
                <FormControl.Label>Los otros miembros de nuestra familia son</FormControl.Label>
                <Input onChangeText={setmifamilia} value={mifamilia} placeholder="" multiline />
               
            </FormControl>

            <FormControl >
                <FormControl.Label>Nosotros vivimos  en la provincia de</FormControl.Label>
                <Input onChangeText={setnuestraPro} value={nuestraPro} placeholder="" multiline />
              
            </FormControl>


            <FormControl >
                <FormControl.Label>y el idioma que hablamos es</FormControl.Label>
                <Input onChangeText={setidioma} value={idioma} placeholder="" />
               
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
                <Icon as={Entypo} name="mail"></Icon>
            }>
                Enviar respuesta
            </Button>

            <Divider />
        </Box>

    </ScrollView>;
};
