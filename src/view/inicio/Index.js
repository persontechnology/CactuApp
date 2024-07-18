import React, { useContext, useState, useEffect } from "react";
import { RefreshControl } from "react-native";
import { Pressable, Text, Alert, Box, VStack, HStack, Spacer, Flex, Badge, useToast, ScrollView, View } from "native-base";
import { AuthContext } from "../../service/AuthContext";
import { API_URL } from "@env";

export default function Index({ navigation, route }) {
    const { userId, userToken, userNombres } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);
    const toast = useToast();
    const [data, setdata] = useState([])

    

    const acceder = async () => {
        setRefreshing(true);
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
            // console.log(result)
            if (result.data) {
                setdata(result.data)

            }

        } catch (error) {
            toast.show({ 'description': error.toString() })
            console.log(error.toString())
        } finally {

            setRefreshing(false)
        }
    }


    useEffect(() => {
        acceder();
        // actualizar listado
        if (route.params?.estado) {
            acceder();
        }
    }, [route.params?.estado])

    return (
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={acceder} />
        } >
            <View px={"3"}>

                <Box>
                    {
                        refreshing ? <></> : <View>
                            <View my={1}>
                                <Alert w="100%" variant={"subtle"} colorScheme="success" status="success" >
                                    <VStack space={1} flexShrink={1} w="100%">
                                        <HStack flexShrink={1} space={1} alignItems="center" justifyContent="space-between">
                                            <HStack space={1} flexShrink={1} alignItems="center">
                                                <Text color={"coolGray.800"}>
                                                    Hola {userNombres}, tienes {data.length} cartas por responder.
                                                </Text>
                                            </HStack>
                                        </HStack>
                                    </VStack>
                                </Alert>
                            </View>
                            {
                                data.map((e) => {

                                    return (
                                        <Pressable key={e.id} my={1} onPress={
                                            () => {
                                                var pantalla = "";
                                                
                                                if(e.estado=='Respondida'){
                                                    pantalla="DescargarEliminar";
                                                }else{
                                                    switch (e.tipo_carta_nombre) {
                                                        case "Presentación":
                                                            pantalla = "Presentacion"
                                                            break;
                                                        case "Agradecimiento":
                                                            pantalla = "Agradecimiento"
                                                            break;
                                                        case "Iniciada":
                                                            pantalla = "Iniciada"
                                                            break;
                                                        default:
                                                            pantalla = "Contestacion"
                                                            break;
                                                    }
                                                }

                                                navigation.navigate(pantalla, e);
                                            }

                                        }>
                                            {({
                                                isHovered,
                                                isPressed
                                            }) => {
                                                return <Box borderColor="coolGray.300" shadow="3" bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : e.estado == 'Respondida' ? 'success.50' : 'warning.50'} p="3" rounded="8" style={{
                                                    transform: [{
                                                        scale: isPressed ? 0.96 : 1
                                                    }]
                                                }}>
                                                    <HStack alignItems="center">


                                                        <Text fontSize={8} color="coolGray.800">
                                                            TIPO DE CARTA
                                                        </Text>
                                                        <Spacer />
                                                        <Badge colorScheme={e.estado == 'Respondida' ? 'success' : 'warning'} _text={{
                                                            color: "white"
                                                        }} variant="solid" rounded="4">
                                                            {e.tipo_carta_nombre}
                                                        </Badge>
                                                    </HStack>
                                                    <Text color="coolGray.800" fontWeight="medium" fontSize="sm">
                                                        {e.created_at}
                                                    </Text>
                                                    <Text fontSize="xs" color="coolGray.700">
                                                        {"Asunto"}
                                                    </Text>
                                                    <Flex>
                                                        <HStack space={"1"}>
                                                           
                                                            <Text fontSize={12} fontWeight="medium" color={e.estado == 'Respondida' ? 'success.700' : 'yellow.600'}>
                                                                {e.asunto}
                                                            </Text>
                                                        </HStack>
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