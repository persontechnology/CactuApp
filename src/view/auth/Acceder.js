import React, { useState, useEffect } from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../../service/AuthContext';
import { Box, View,Icon, StatusBar, Image, Text, useToast, Heading, VStack, FormControl, InputGroup, InputLeftAddon, InputRightAddon, Stack, WarningOutlineIcon, Input, Button, Center, ScrollView } from "native-base";
import { API_URL, API_NAME } from "@env";

import { Entypo } from "@native-base/icons";


export default function Acceder() {
    const [numero_child, setnumero_child] = useState('999999999');
    const [cargando, setcargando] = useState(false);
    const { signIn } = React.useContext(AuthContext);
    const toast = useToast();

    const acceder = async () => {
        setcargando(true);
        try {
            const res = await fetch(API_URL + "login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    numero_child
                })
            });
            const data = await res.json();
            // console.log(data)
            if (data.errors) {
                Object.entries(data.errors).forEach(([key, value]) => {
                    toast.show({ 'description': value.toString() })
                });
            }
            if (data.message === 'ok') {
                signIn(data);
            }

        } catch (error) {
            toast.show({ 'description': error.toString() })
        } finally {
            setcargando(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <View style={styles.container} bg="green.800">
            
            <Animatable.View animation={"bounceInUp"} duration={4000} style={styles.header}>
                <Center>
                    <Image source={require('../../public/img/3.png')} style={styles.logo} resizeMode='stretch' alt='CACTU'></Image>
                    <Heading size={"3xl"} color={"white"} fontWeight="bold">CACTU</Heading>
                </Center>
            </Animatable.View>
            <View style={styles.footer}>
                
                        <Heading size="lg" fontWeight="600" color="green.800" _dark={{
                            color: "warmGray.50"
                        }}>
                            Bienvenido
                        </Heading>
                        <Heading mt="1" _dark={{
                            color: "warmGray.200"
                        }} color="coolGray.600" fontWeight="medium" size="xs">
                            ¡Ingrese su número child para continuar.!
                        </Heading>


                        <VStack space={3} mt="5">
                            <FormControl isRequired>
                                <Stack mx="1">
                                    <FormControl.Label>Número child </FormControl.Label>
                                    <Input value={numero_child} onChangeText={setnumero_child} size="2xl" type="text" keyboardType='numeric' placeholder="Ingrese aquí..." />
                                    <FormControl.HelperText>
                                        Debe ingresar su número child registrado en CACTU.
                                    </FormControl.HelperText>
                                </Stack>
                            </FormControl>
                           
                            <Button mt="2" onPress={acceder} isLoading={cargando} isLoadingText="Solicitando" colorScheme={cargando ? 'secondary' : 'success'} variant={"solid"} leftIcon={
                            <Icon as={Entypo} name="login"></Icon>
                            }>
                                Acceder
                            </Button>
                        </VStack>
                   
            </View>
        </View>
        </ScrollView>
    )
}

const { height } = Dimensions.get('screen');
const height_logo = height * 0.7 * 0.4;

var styles = StyleSheet.create({
    container: {
        flex: 2,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: 30,
        paddingHorizontal: 30
    },
    logo: {
        height: height_logo,
        width: height_logo,
    }
})