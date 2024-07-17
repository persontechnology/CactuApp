import { Center,Box, Button, Icon } from 'native-base'
import React from 'react'
import { AuthContext } from '../../service/AuthContext';
import AntDesign from 'react-native-vector-icons/AntDesign'
export default function Perfil({navigate}) {
const { signOut } = React.useContext(AuthContext);

  return (
    <Center flex={1}>
        <Box>
            <Button leftIcon={<Icon as={AntDesign} name="close"></Icon>} colorScheme={"success"} onPress={signOut}>Salir de la aplicación</Button>
        </Box>
    </Center>
  )
}
