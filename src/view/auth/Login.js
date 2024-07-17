import React, { useState, useContext } from "react";
import { Box, Heading, VStack, Flex, Pressable, Text, Button, Center, Image, useToast, Icon, ScrollView } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env";
import { AuthContext } from '../../service/AuthContext';
const Example = () => {

    const [numero_child, setnumero_child] = useState('');
    const [cargando, setcargando] = useState(false);
    const toast = useToast();
    const { signIn } = useContext(AuthContext);
    
    


    const acceder = async () => {
    
        var valuefcm = await AsyncStorage.getItem('fcmtoken');
        
        if (numero_child === '') {
            toast.show({ 'description': 'Ingrese número child porfavor.!' })
        } else {
            setcargando(true);
            try {
                const res = await fetch(API_URL + "login", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        numero_child,
                        'fcm_token':valuefcm
                    })
                });
                const data = await res.json();
                console.log(data)
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

    }

    return <Center>

        <Center>
            <Image animation="pulse" size={"lg"} iterationCount="infinite" source={require("../../public/img/logo.png")} alt="Logo" />
            <Heading color={"info.900"}>CACTU</Heading>
        </Center>

        <Box safeArea p="2" w="90%" maxW="290" py="2">

            {/* <Heading size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }} fontWeight="semibold">
                Bienvenido
            </Heading> */}

            <VStack space={0.5} w="100%" px="3">
                <Heading mt="1" color="coolGray.600" _dark={{
                    color: "warmGray.200"
                }} fontWeight="medium" size="xs">
                    Ingresa tu número child para continuar.
                </Heading>
                
                <Heading size="md">{numero_child}_</Heading>

                <Button colorScheme={"info"} isLoading={cargando} onPress={acceder}>INGRESAR</Button>

                <Flex direction="row" mt={1}>
                    <Pressable onPress={() => setnumero_child(numero_child + "1")}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.100"} size="16" >
                                1
                            </Center>
                        }}
                    </Pressable>
                    <Pressable onPress={() => setnumero_child(numero_child + "2")}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.200"} size="16" >
                                2
                            </Center>
                        }}
                    </Pressable>
                    <Pressable onPress={() => setnumero_child(numero_child + "3")}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.300"} size="16" >
                                3
                            </Center>
                        }}
                    </Pressable>
                    <Pressable onPress={() => setnumero_child(numero_child + "4")}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.400"} size="16" >
                                4
                            </Center>
                        }}
                    </Pressable>
                </Flex>
                <Flex direction="row">
                    <Pressable onPress={() => setnumero_child(numero_child + "5")}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.100"} size="16" >
                                5
                            </Center>
                        }}
                    </Pressable>
                    <Pressable onPress={() => setnumero_child(numero_child + "6")}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.200"} size="16" >
                                6
                            </Center>
                        }}
                    </Pressable>
                    <Pressable onPress={() => setnumero_child(numero_child + "7")}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.300"} size="16" >
                                7
                            </Center>
                        }}
                    </Pressable>
                    <Pressable onPress={() => setnumero_child(numero_child + "8")}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.400"} size="16" >
                                8
                            </Center>
                        }}
                    </Pressable>
                </Flex>
                <Flex direction="row">
                    <Pressable onPress={() => setnumero_child(numero_child + "9")}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.100"} size="16" >
                                9
                            </Center>
                        }}
                    </Pressable>
                    <Pressable onPress={() => setnumero_child(numero_child + "0")}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.200"} size="16" >
                                0
                            </Center>
                        }}
                    </Pressable>
                    <Pressable onPress={() => setnumero_child('')}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.300"} size="16" >
                                Limpiar
                            </Center>
                        }}
                    </Pressable>


                    <Pressable onPress={() => setnumero_child(numero_child.slice(0, -1))}>
                        {({
                            isPressed
                        }) => {
                            return <Center bg={isPressed ? "white" : "info.400"} size="16" >
                                Borrar
                            </Center>
                        }}
                    </Pressable>

                </Flex>
            </VStack>
        </Box>
    </Center>;
};

export default function Login() {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Center flex={1} px="3">

                <Example />

            </Center>
        </ScrollView>

    );
};
