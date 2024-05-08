import React, { useState, useEffect, useContext } from "react";
import { FormControl, Icon, Avatar, useToast, Input, HStack, Text, Divider, Box, WarningOutlineIcon, ScrollView, Center, NativeBaseProvider, Heading, Button, View, Pressable } from "native-base";
import ReactNativeBlobUtil from 'react-native-blob-util';
import { AuthContext } from "../../service/AuthContext";
import { API_URL } from "@env";
import { Entypo } from "@native-base/icons";
import ImagePicker from 'react-native-image-crop-picker';

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

    const [fotoPersonal, setfotoPersonal] = useState("https://www.seekpng.com/png/full/50-500887_canton-of-lucerne.png");
    const [fotoFamiliar, setfotoFamiliar] = useState("https://www.seekpng.com/png/full/50-500887_canton-of-lucerne.png");
    const [fotoPersonalBase, setfotoPersonalBase] = useState('');
    const [fotoFamiliarBase, setfotoFamiliarBase] = useState('');



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
                <Input onChangeText={sethola} value={hola} placeholder="Ingresa el nombre de tu patrocinador." />
                
            </FormControl>

            <FormControl >
                <FormControl.Label>Soy</FormControl.Label>
                <Input onChangeText={setsoy} value={soy} placeholder="Ingresa tu nombre" />
                
            </FormControl>

            <FormControl >
                <FormControl.Label>y mis amigos me dicen</FormControl.Label>
                <Input onChangeText={setmeDicen} value={meDicen} placeholder="Como te dicen" />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>la edad que tengo es</FormControl.Label>
                <Input onChangeText={setedad} value={edad} placeholder="Escribe aquí.." />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Mi mejor amigo se llama</FormControl.Label>
                <Input onChange={setmiMejorAmigo} value={miMejorAmigo} placeholder="Escribe aquí.." />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>es mi mejor amigo porque,</FormControl.Label>
                <Input onChangeText={setesMejorAmigo} value={esMejorAmigo} multiline={true} placeholder="Escribe aquí.." />
              
            </FormControl>

            <FormControl >
                <FormControl.Label>Lo que maś me gusta hacer es,</FormControl.Label>
                <Input onChangeText={setloquehago} value={loquehago} multiline={true} placeholder="Escribe aquí.." />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Cuando sea grande mi sueño es,</FormControl.Label>
                <Input onChangeText={setmiSueno} value={miSueno} multiline={true} placeholder="Escribe aquí.." />
              
            </FormControl>

            <FormControl >
                <FormControl.Label>El lugar donde aprendo es,</FormControl.Label>
                <Input onChangeText={setdondeAprendo} value={dondeAprendo} multiline={true} placeholder="Escribe aquí.." />
               
            </FormControl>

            <FormControl >
                <FormControl.Label>lo que me gusta aprender es,</FormControl.Label>
                <Input onChangeText={setgustaAprendes} value={gustaAprendes} multiline={true} placeholder="Escribe aquí.." />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Lo más importante que me pasó últimamente es</FormControl.Label>
                <Input onChangeText={setmePaso} value={mePaso} multiline={true} placeholder="Escribe aquí.." />
              
            </FormControl>

            <FormControl >
                <FormControl.Label>Lo que me gustaría aprender en el programa de ChildFund es</FormControl.Label>
                <Input onChangeText={setmeGustaria} value={meGustaria} multiline={true} placeholder="Escribe aquí.." />
                
            </FormControl>

            <FormControl >
                <FormControl.Label>Esta es mi famila</FormControl.Label>
                <Input onChangeText={setmiFamilia} value={miFamilia} multiline={true} placeholder="Escribe aquí.." />
               
            </FormControl>

            <Heading size={"sm"} mt="3">También quiero contarte del lugar donde vivo</Heading>

            <FormControl >
                <FormControl.Label>Nuestra provincia se llama</FormControl.Label>
                <Input onChangeText={setnuestraPro} value={nuestraPro} placeholder="Escribe aquí.." />
              
            </FormControl>

            <FormControl>
                <FormControl.Label>y el idioma que hablamos es</FormControl.Label>
                <Input onChangeText={setidioma} value={idioma} placeholder="Escribe aquí.." />
                
            </FormControl>

            <Heading size={"sm"} mt="3">Donde nosotros vivimos hay sitios muy hermosos,</Heading>

            <FormControl >
                <FormControl.Label>mi lugar favorito es</FormControl.Label>
                <Input onChangeText={setlugarFavorito} value={lugarFavorito} placeholder="Escribe aquí.." />
               
            </FormControl>

            <Heading size={"sm"} mt="3">También tenemos comida típica, por ejemplo,</Heading>

            <FormControl>
                <FormControl.Label>la comida típica es</FormControl.Label>
                <Input onChangeText={setcomidaTipica} value={comidaTipica} placeholder="Escribe aquí.." />
               
            </FormControl>

            <FormControl >
                <FormControl.Label>y a mi me gusta comer</FormControl.Label>
                <Input onChangeText={setcomer} value={comer} placeholder="Escribe aquí.." />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>De nuestras tradiciones, lo que más me gusta es</FormControl.Label>
                <Input multiline onChangeText={setmasMeGusta} value={masMeGusta} placeholder="Escribe aquí.." />
               
            </FormControl>

            <FormControl >
                <FormControl.Label>Me gustaría hacerte una pregunta</FormControl.Label>
                <Input multiline onChangeText={setpregunta} value={pregunta} placeholder="Escribe aquí.." />
               
            </FormControl>

            <FormControl>
                <FormControl.Label>Cuéntale por qué quisieras que te conteste tu patrocinador, envíale un mensaje de despedida</FormControl.Label>
                <Input multiline onChangeText={setdespedida} value={despedida} placeholder="Escribe aquí.." />
               
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
                <Icon as={Entypo} name="mail"></Icon>
            }>
                Enviar respuesta
            </Button>

            <Divider />
        </Box>

    </ScrollView>;
};
