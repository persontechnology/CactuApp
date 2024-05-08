import React from 'react'
import { View, Text, Image, StyleSheet, StatusBar,Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';


const data = [
    {
        title: 'Bienvenido',
        text: 'Misión.\nContribuir a la generación de una cultura de respeto a los derechos humanos de grupos vulnerables y excluidos, con principal énfasis en infantes, niñas, niños, adolescentes, jóvenes y mujeres desde la desde la gestión articulada de acciones y en base al desarrollo de capacidades.',
        image: require('../public/img/1.png'),
        bg: '#0369a1',
    },
    {
        title: '',
        text: 'Misión.\nAyudar a los niños y niñas que viven en condiciones de carencia, exclusión y vulnerabilidad a tener la capacidad de mejorar sus vidas para ser personas que generen cambios positivos y duraderos en sus comunidades.',
        image: require('../public/img/2.png'),
        bg: '#047857',
    },
    {
        title: 'PRESENTA',
        text: "Aplicación simple para\n recibir y escribir fácilmente una carta.",
        image: require('../public/img/3.png'),
        bg: '#22bcb5',
    },
];

type Item = typeof data[0];
const {width,height}=Dimensions.get('window');

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
       width: width * 0.50, 
       height: width * 0.50,
        marginVertical: 32,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },
    buttonCircle: {
        width: 44,
        height: 44,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default function IntroSlider({navigation}) {

    const _renderItem = ({ item }: { item: Item }) => {
        return (
            <View
                style={[
                    styles.slide,
                    {
                        backgroundColor: item.bg,
                    },
                ]}>
                <Text style={styles.title}>{item.title}</Text>
                <Animatable.Image animation="pulse"  iterationCount="infinite" source={item.image} style={styles.image} />
                <Animatable.Text animation="fadeInLeft"  style={styles.text}>{item.text}</Animatable.Text>
            </View>
        );
    };

    const _keyExtractor = (item: Item) => item.title;

    const _renderNextButton = () => {
        return (
            <Animatable.View animation={"zoomIn"}  iterationCount="infinite" style={styles.buttonCircle}>
                <Icon
                    name="arrow-forward"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                />
            </Animatable.View>
        );
    };

    const _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon name="checkmark" color="rgba(255, 255, 255, .9)" size={24} />
            </View>
        );
    };


    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent" />
            <AppIntroSlider
                keyExtractor={_keyExtractor}
                renderDoneButton={_renderDoneButton}
                renderNextButton={_renderNextButton}
                renderItem={_renderItem}
                data={data}
                onDone={()=>navigation.navigate('Login')}
            />
        </View>
    )
}
