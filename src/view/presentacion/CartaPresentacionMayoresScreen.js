
import React, { useState, useEffect, useContext } from "react";
import { FormControl, Icon, TextArea, useToast, Input, Stack, Text, Divider, Box, WarningOutlineIcon, ScrollView, Center, NativeBaseProvider, Heading, Button, View } from "native-base";
import { useValidation } from 'react-native-form-validator';
import { AuthContext } from "../../service/AuthContext";
import { API_URL } from "@env";
import { Entypo } from "@native-base/icons";

export default function CartaPresentacionMayoresScreen({ params }) {

  const { userId, userToken } = useContext(AuthContext);
  const [op, setop] = useState('mayor');
  const [cargando, setcargando] = useState(false);
  const toast = useToast();

  const [hola, sethola] = useState('o');
  const [soy, setsoy] = useState('o');
  const [meDicen, setmeDicen] = useState('o');
  const [edad, setedad] = useState('o');
  const [miMejorAmigo, setmiMejorAmigo] = useState("o");
  const [esMejorAmigo, setesMejorAmigo] = useState("o");
  const [loquehago, setloquehago] = useState("o");
  const [miSueno, setmiSueno] = useState("o");
  const [dondeAprendo, setdondeAprendo] = useState("o");
  const [gustaAprendes, setgustaAprendes] = useState("o");
  const [mePaso, setmePaso] = useState("o");
  const [meGustaria, setmeGustaria] = useState("o");
  const [miFamilia, setmiFamilia] = useState("o");
  const [nuestraPro, setnuestraPro] = useState("o");
  const [idioma, setidioma] = useState("o");
  const [lugarFavorito, setlugarFavorito] = useState("o");
  const [comidaTipica, setcomidaTipica] = useState("o");
  const [comer, setcomer] = useState("o");
  const [masMeGusta, setmasMeGusta] = useState("o");
  const [pregunta, setpregunta] = useState("o");
  const [despedida, setdespedida] = useState("o");

  const [hola_v, sethola_v] = useState('');
  const [soy_v, setsoy_v] = useState('');
  const [meDicen_v, setmeDicen_v] = useState('');
  const [edad_v, setedad_v] = useState('');
  const [miMejorAmigo_v, setmiMejorAmigo_v] = useState('');
  const [esMejorAmigo_v, setesMejorAmigo_v] = useState('');
  const [loquehago_v, setloquehago_v] = useState('');
  const [miSueno_v, setmiSueno_v] = useState('');
  const [dondeAprendo_v, setdondeAprendo_v] = useState('');
  const [gustaAprendes_v, setgustaAprendes_v] = useState('');
  const [mePaso_v, setmePaso_v] = useState('');
  const [meGustaria_v, setmeGustaria_v] = useState('');
  const [miFamilia_v, setmiFamilia_v] = useState('');
  const [nuestraPro_v, setnuestraPro_v] = useState('');
  const [idioma_v, setidioma_v] = useState('');
  const [lugarFavorito_v, setlugarFavorito_v] = useState('');
  const [comidaTipica_v, setcomidaTipica_v] = useState('');
  const [comer_v, setcomer_v] = useState('');
  const [masMeGusta_v, setmasMeGusta_v] = useState('');
  const [pregunta_v, setpregunta_v] = useState('');
  const [despedida_v, setdespedida_v] = useState('');


  const atributos = {
    // userId,
    // buzonCartaId: params.id,
    // op,
    hola,
    soy,
    meDicen,
    edad,
    miMejorAmigo,
    esMejorAmigo,
    loquehago,
    miSueno,
    dondeAprendo,
    gustaAprendes,
    mePaso,
    meGustaria,
    miFamilia,
    nuestraPro,
    idioma,
    lugarFavorito,
    comidaTipica,
    comer,
    masMeGusta,
    pregunta,
    despedida,
  }


  function validar() {

    var estado = true;
    Object.entries(atributos).forEach(([e]) => {
      var y = eval(e);
      if (y == '') {
        var x = `set${e.toString()}_v("El campo ${e.toString().split(/(?=[A-Z])/).join(" ")} es requerido")`;
        estado = false;
      } else {
        var x = `set${e.toString()}_v("")`;
      }
      eval(x)
    });

    return estado;

  }
  const acceder = async () => {
    if (validar()) {
      setcargando(true);

      try {
        const res = await fetch(API_URL + "responder-presentacion-mayores", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({
            userId,
            buzonCartaId: params.id,
            op,
            hola,
            soy,
            meDicen,
            edad,
            miMejorAmigo,
            esMejorAmigo,
            loquehago,
            miSueno,
            dondeAprendo,
            gustaAprendes,
            mePaso,
            meGustaria,
            miFamilia,
            nuestraPro,
            idioma,
            lugarFavorito,
            comidaTipica,
            comer,
            masMeGusta,
            pregunta,
            despedida,
          })
        });
        const result = await res.json();
        if (result.errors) {
          Object.entries(result.errors).forEach(([key, value]) => {
            var x = `set${key.toString()}_v("${value.toString()}")`;
            eval(x)
          });
        }

      } catch (error) {
        toast.show({ 'description': error.toString() })
      } finally {
        setcargando(false);
      }
    } else {
      toast.show({'description':'Complete datos.'})
    }
  }

  return <ScrollView contentContainerStyle={{ flexGrow:1 }} bg="white">
      
      <Box mx={3}>
        <Heading size={"sm"} mt="3">Presentación </Heading>

        <FormControl isInvalid={hola_v == '' ? false : true}>
          <FormControl.Label>Hola</FormControl.Label>
          <Input onChangeText={sethola} value={hola} placeholder="Ingresa el nombre de tu patrocinador." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {hola_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={soy_v == '' ? false : true}>
          <FormControl.Label>Soy</FormControl.Label>
          <Input onChangeText={setsoy} value={soy} placeholder="Ingresa tu nombre" />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {soy_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={meDicen_v == '' ? false : true}>
          <FormControl.Label>y mis amigos me dicen</FormControl.Label>
          <Input onChangeText={setmeDicen} value={meDicen} placeholder="Como te dicen" />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {meDicen_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={edad_v == '' ? false : true}>
          <FormControl.Label>la edad que tengo es</FormControl.Label>
          <Input onChangeText={setedad} value={edad} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {edad_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={miMejorAmigo_v == '' ? false : true}>
          <FormControl.Label>Mi mejor amigo se llama</FormControl.Label>
          <Input onChange={setmiMejorAmigo} value={miMejorAmigo} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {miMejorAmigo_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={esMejorAmigo_v == '' ? false : true}>
          <FormControl.Label>es mi mejor amigo porque,</FormControl.Label>
          <Input onChangeText={setesMejorAmigo} value={esMejorAmigo} multiline={true} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {esMejorAmigo_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={loquehago_v == '' ? false : true}>
          <FormControl.Label>Lo que maś me gusta hacer es,</FormControl.Label>
          <Input onChangeText={setloquehago} value={loquehago} multiline={true} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {loquehago_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={miSueno_v == '' ? false : true}>
          <FormControl.Label>Cuando sea grande mi sueño es,</FormControl.Label>
          <Input onChangeText={setmiSueno} value={miSueno} multiline={true} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {miSueno_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={dondeAprendo_v == '' ? false : true}>
          <FormControl.Label>El lugar donde aprendo es,</FormControl.Label>
          <Input onChangeText={setdondeAprendo} value={dondeAprendo} multiline={true} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {dondeAprendo_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={gustaAprendes_v == '' ? false : true}>
          <FormControl.Label>lo que me gusta aprender es,</FormControl.Label>
          <Input onChangeText={setgustaAprendes} value={gustaAprendes} multiline={true} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {gustaAprendes_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={mePaso_v == '' ? false : true}>
          <FormControl.Label>Lo más importante que me pasó últimamente es</FormControl.Label>
          <Input onChangeText={setmePaso} value={mePaso} multiline={true} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {mePaso_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={meGustaria_v == '' ? false : true}>
          <FormControl.Label>Lo que me gustaría aprender en el programa de ChildFund es</FormControl.Label>
          <Input onChangeText={setmeGustaria} value={meGustaria} multiline={true} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {meGustaria_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={miFamilia_v == '' ? false : true}>
          <FormControl.Label>Esta es mi famila</FormControl.Label>
          <Input onChangeText={setmiFamilia} value={miFamilia} multiline={true} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {miFamilia_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <Heading size={"sm"} mt="3">También quiero contarte del lugar donde vivo</Heading>

        <FormControl isInvalid={nuestraPro_v == '' ? false : true}>
          <FormControl.Label>Nuestra provincia se llama</FormControl.Label>
          <Input onChangeText={setnuestraPro} value={nuestraPro} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {nuestraPro_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={idioma_v == '' ? false : true}>
          <FormControl.Label>y el idioma que hablamos es</FormControl.Label>
          <Input onChangeText={setidioma} value={idioma} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {idioma_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <Heading size={"sm"} mt="3">Donde nosotros vivimos hay sitios muy hermosos,</Heading>

        <FormControl isInvalid={lugarFavorito_v == '' ? false : true}>
          <FormControl.Label>mi lugar favorito es</FormControl.Label>
          <Input onChangeText={setlugarFavorito} value={lugarFavorito} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {lugarFavorito_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <Heading size={"sm"} mt="3">También tenemos comida típica, por ejemplo,</Heading>

        <FormControl isInvalid={comidaTipica_v == '' ? false : true}>
          <FormControl.Label>la comida típica es</FormControl.Label>
          <Input onChangeText={setcomidaTipica} value={comidaTipica} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {comidaTipica_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={comer_v == '' ? false : true}>
          <FormControl.Label>y a mi me gusta comer</FormControl.Label>
          <Input onChangeText={setcomer} value={comer} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {comer_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={masMeGusta_v == '' ? false : true}>
          <FormControl.Label>De nuestras tradiciones, lo que más me gusta es</FormControl.Label>
          <Input multiline onChangeText={setmasMeGusta} value={masMeGusta} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {masMeGusta_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={pregunta_v == '' ? false : true}>
          <FormControl.Label>Me gustaría hacerte una pregunta</FormControl.Label>
          <Input multiline onChangeText={setpregunta} value={pregunta} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {pregunta_v}
          </FormControl.ErrorMessage>
        </FormControl>

        <FormControl isInvalid={despedida_v == '' ? false : true}>
          <FormControl.Label>Cuéntale por qué quisieras que te conteste tu patrocinador, envíale un mensaje de despedida</FormControl.Label>
          <Input multiline onChangeText={setdespedida} value={despedida} placeholder="Escribe aquí.." />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {despedida_v}
          </FormControl.ErrorMessage>
        </FormControl>


        <Button mt="2" onPress={acceder} isLoading={cargando} isLoadingText="Solicitando" colorScheme={cargando ? 'secondary' : 'success'} variant={"solid"} leftIcon={
          <Icon as={Entypo} name="mail"></Icon>
        }>
          Enviar respuesta
        </Button>

        <Divider />
      </Box>
      
  </ScrollView>;
};
