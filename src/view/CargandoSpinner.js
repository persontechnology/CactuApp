import React from 'react'
import { Center,HStack,Spinner,Heading } from 'native-base'
export default function CargandoSpinner() {
  return (
    <Center flex={1}>
      <HStack space={2} justifyContent="center">
      <Spinner accessibilityLabel="Loading posts" color={"info.700"} size="lg" />
      <Heading color="info.700">
        Cargando...
      </Heading>
    </HStack>
    </Center>
  )
}
