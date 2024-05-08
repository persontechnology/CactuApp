import React from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider,Link, ScrollView } from "native-base";
import { API_HOST } from "@env";
const Example = () => {
    return <Box alignItems="center" >
        <Box maxW="100%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _light={{
            backgroundColor: "gray.50"
        }}>
            <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                <Center><Image animation="pulse" size={"lg"} iterationCount="infinite" source={require("../../public/img/logo.png")} alt="Logo" /></Center>
                </AspectRatio>
                <Center  position="absolute" w={"100%"} bottom="0" px="3" py="1.5">
                    <Heading color={"info.900"}>CACTU</Heading>
                </Center>
            </Box>
            <Stack p="4" space={3}>
                <Stack space={2}>
                    <Heading size="md" ml="-1" color={"info.900"}>
                        Corporación de Asociaciones de Cotopaxi y Tungurahua
                    </Heading>
                    <Text fontSize="xs" fontWeight="500" ml="-0.5" mt="-1">
                        (CACTU) es una organización comunitaria que trabaja con los niños, niñas, adolescentes, jóvenes, sus familias y comunidades apoyando el fortalecimiento del sistema de protección integral de derechos, en coordinación con el Estado.
                    </Text>
                    
                </Stack>
                <Text fontWeight="400">
                     {"www.cactu.ec\nVersión: 0.1 \n© "+new Date().getFullYear()+""}
                </Text>
                
                
                <HStack alignItems="center" space={4} justifyContent="center">
                    <HStack alignItems="center">
                        <Box alignItems="center">
                            <Text >Diseño y Desarrollo por:</Text>
                            <Link href="https://persontechnology.com">
                                www.persontechnology.com
                            </Link>
                        </Box>
                    </HStack>
                </HStack>
            </Stack>
        </Box>
    </Box>;
};

export default function Inicio() {
    return (
        <ScrollView contentContainerStyle={{ flexGrow:1 }}>
            <Center flex={1} px="3">
                <Example />
            </Center>
        </ScrollView>
        
    );
};
