import React, { useContext, useState, useEffect } from "react";
import { Pressable, Text,Alert, Box,Heading,VStack, HStack, Spacer, Flex, Badge, Center, NativeBaseProvider, useToast, Spinner, ScrollView, View } from "native-base";
import { AuthContext } from "../service/AuthContext";
import { API_URL } from "@env";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function HomeScreen({navigation}) {
    const { userId, userToken,userNombres } = useContext(AuthContext);
    const [cargando, setcargando] = useState(false);
    const toast = useToast();
    const [data, setdata] = useState([])


    const acceder = async () => {
        setcargando(true);
        try {
            const res = await fetch(API_URL + "listar-mis-cartas", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    userId
                })
            });
            const result = await res.json();
           
            if (result.data) {
                setdata(result.data)
                
            }

        } catch (error) {
            toast.show({ 'description': error.toString() })
        } finally {
            setcargando(false);
        }
    }

    useEffect(() => {
        acceder();
        
    }, [])

    const insets = useSafeAreaInsets();


    return (
        <ScrollView >
            <View px={"3"}>

                <Box>
                    {
                        cargando ? <Spinner color={"success.800"} size="lg" /> : <View>
                            <View my={1}>
                            <Alert w="100%" variant={"subtle"} colorScheme="success" status="success" >
                                    <VStack space={1} flexShrink={1} w="100%">
                                    <HStack flexShrink={1} space={1} alignItems="center" justifyContent="space-between">
                                        <HStack space={1} flexShrink={1} alignItems="center">
                                        <Text color={"coolGray.800"}>
                                            Hola {userNombres}, tienes {data.length} cartas.
                                        </Text>
                                        </HStack>
                                    </HStack>
                                    </VStack>
                                </Alert>
                            </View>
                            {
                                data.map((e) => {
                                    console.log(e)
                                    return (
                                        <Pressable key={e.id} my={1} onPress={
                                            ()=>{
                                                var pantalla="";

                                                switch (e.tipo_carta_nombre) {
                                                    case "Presentación":
                                                        pantalla="Presentacion"
                                                        break;
                                                    default:
                                                        pantalla="Details"
                                                        break;
                                                }
                                                navigation.navigate(pantalla,e)
                                            }

                                        }>
                                            {({
                                                isHovered,
                                                isFocused,
                                                isPressed
                                            }) => {
                                                return <Box borderColor="coolGray.300" shadow="3" bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} p="3" rounded="8" style={{
                                                    transform: [{
                                                        scale: isPressed ? 0.96 : 1
                                                    }]
                                                }}>
                                                    <HStack alignItems="center">
                                                        
                                                        
                                                        <Text fontSize={8} color="coolGray.800">
                                                            TIPO DE CARTA
                                                        </Text>
                                                        <Spacer />
                                                        <Badge colorScheme="darkBlue" _text={{
                                                            color: "white"
                                                        }} variant="solid" rounded="4">
                                                            {e.tipo_carta_nombre}
                                                        </Badge>
                                                    </HStack>
                                                    <Text color="coolGray.800" fontWeight="medium" fontSize="sm">
                                                    {e.created_at}
                                                    </Text>
                                                    <Text  fontSize="xs" color="coolGray.700">
                                                        {"Estado de la carta "+e.estado}
                                                    </Text>
                                                    <Flex>
                                                        <Text fontSize={12} fontWeight="medium" color="darkBlue.600">
                                                            Precione para reponder
                                                        </Text>
                                                    </Flex>
                                                </Box>;
                                            }}
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                    }
                </Box>

            </View>
        </ScrollView>
    );
};
