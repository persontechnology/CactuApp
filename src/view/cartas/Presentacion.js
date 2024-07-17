import { HStack, Center, CheckIcon, Text, Button, Icon, View } from 'native-base'
import React, { useEffect } from 'react'
import PresentacionMayores from './PresentacionMayores';
import PresentacionMenores from './PresentacionMenores';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Presentacion({ navigation, route }) {
    const { tipo_carta_nombre, estado, edad } = route.params;
    console.log("mi eddad es "+edad)
    useEffect(() => {
        navigation.setOptions({title:"Carta de "+tipo_carta_nombre})
    }, []);
    
    return (
        <Center flex={1}>
            {
                estado === 'Respondida' ? (
                    <View>
                        <HStack space={2} my={3}>
                            <Text color="emerald.500" fontSize="md">
                                Carta ya fue respondida.!
                            </Text>
                        </HStack>
                        <Button onPress={()=>navigation.goBack()} colorScheme={"success"} leftIcon={<Icon as={Ionicons} name="home" size="sm" />}>
                            Regresar
                        </Button>
                    </View>
                ) : edad > 5 ? <PresentacionMayores navigation={navigation} params={route.params} /> : <PresentacionMenores navigation={navigation} params={route.params} />
            }
        </Center>
    )
}


