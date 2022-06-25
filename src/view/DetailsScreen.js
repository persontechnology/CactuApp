
import {View, Stack, Alert, HStack, VStack, Text, Divider, Center, NativeBaseProvider, Box } from "native-base";
import React from 'react'

export default function DetailsScreen({navigation,route}) {
    const {tipo_carta_nombre,estado,edad}=route.params;

  return estado==='Respondida'?(
    <Center mx={3}>
        <Alert w="100%" variant={"top-accent"} mt={5} mx={2} colorScheme="success" status="success">
            <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                <HStack space={2} flexShrink={1} alignItems="center">
                    <Alert.Icon />
                    <Text color={"coolGray.800"}>
                    Carta ya fue respondida!
                    </Text>
                </HStack>
                </HStack>
            </VStack>
        </Alert>
    </Center>
  ):(
    <Center>
        <Box>
            {
                edad>5?(
                    <View><Text>MAYOR EDAD {edad}</Text></View>
                ):(
                    <View><Text>MENOR EDAD {edad}</Text></View>
                )
            }
        </Box>
    </Center>
  )
}
