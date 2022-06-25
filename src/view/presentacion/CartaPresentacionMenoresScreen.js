import React, { useState } from "react";
import { Input, FormControl,Text, ScrollView, Stack, WarningOutlineIcon, Box, Center, NativeBaseProvider, Button } from "native-base";
import { useValidation } from 'react-native-form-validator';

export default () => {

    const [nombre, setnombre] = useState('');
    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
    useValidation({
      state: { nombre },
      messages:{
        en:{
            numbers: 'El campo "{0}" debe ser un número válido.',
            email: 'El campo "{0}" debe ser un email válido.',
            required: 'El campo "{0}" es requerido.',
            date: 'El campo "{0}" debe contener una fecha válida ({1}).',
            minlength: 'La longitud del campo "{0}" debe ser mayor que {1} caracteres',
            maxlength: 'La longitud del campo "{0}" debe ser menor que {1} caracteres.',
            equalPassword: 'Las contraseñas son diferentes',
            hasNumber: 'El campo "{0}" debe contener un número.',
            hasUpperCase: 'El campo "{0}" debe contener una letra mayúscula',
            hasLowerCase: 'El campo "{0}" debe contener minúsculas',
            hasSpecialCharacter: 'El campo "{0}" debe contener un carácter especial',
        }
      }
    });

    const _onPressButton = () => {
        validate({
            nombre: { required: true,minlength: 3, maxlength: 7 },
        });
      };

    return (
        <ScrollView w="100%">

            <Center flex={1} px="3">
                <Stack space={2.5} alignSelf="center" px="3" bg={"light.50"} w={{
                    base: "100%",
                    md: "25%"
                }}>
                    <Box>
                        <FormControl isInvalid={isFieldInError('nombre')?true:false}>
                            <FormControl.Label>Nombre</FormControl.Label>
                            <Input placeholder="Ingrese nombre" onChangeText={setnombre} value={nombre} />
                            {
                                isFieldInError('nombre') && getErrorsInField('nombre').map((e,i) => (
                                <FormControl.ErrorMessage key={"n"+i} leftIcon={<WarningOutlineIcon size="xs" />}>
                                    {e}
                                </FormControl.ErrorMessage>
                                ))
                            }
                            
                        </FormControl>
                        <Button onPress={_onPressButton}>Enviar</Button>
                    </Box>
                </Stack>
            </Center>
        </ScrollView>

    );
};
