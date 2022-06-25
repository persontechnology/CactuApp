import React from 'react'
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Animatable from 'react-native-animatable';
import { Button, ScrollView } from 'native-base';

const data = [
  {
    id: "1",
    title: 'Misión',
    text: 'Ayudar a los niños y niñas que viven en condiciones de carencia, exclusión y vulnerabilidad a tener la capacidad de mejorar sus vidas para ser personas que generen cambios positivos y duraderos en sus comunidades.',
    image: require('../public/img/1.png'),
    bg: '#ffffff',
  },
  {
    id: "2",
    title: 'Misión',
    text: 'Contribuir a la generación de una cultura de respeto a los derechos humanos de grupos vulnerables y excluidos, con principal énfasis en infantes, niñas, niños, adolescentes, jóvenes y mujeres desde la desde la gestión articulada de acciones y en base al desarrollo de capacidades.',
    image: require('../public/img/2.png'),
    bg: '#ffffff',
  }
];

type Item = typeof data[0];

const { height } = Dimensions.get('screen');
const height_logo = height * 0.9 * 0.4;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: height_logo,
    height: height_logo / 2,
    marginVertical: 32,
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 24
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});


export default function IntroSlider({ navigation }) {
  var slider = AppIntroSlider ?? undefined;
  const renderItem = ({ item }: { item: Item }) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>

        <Animatable.Image animation="pulse" easing="ease-out" resizeMode='stretch' iterationCount="infinite" source={item.image} style={styles.image} ></Animatable.Image>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const keyExtractor = (item: Item) => item.id;

  const renderPagination = (activeIndex: number) => {
    return (
      
      <View style={styles.paginationContainer}>
        
          <View style={styles.paginationDots}>
            {data.length > 1 &&
              data.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dot,
                    i === activeIndex
                      ? { backgroundColor: 'green' }
                      : { backgroundColor: 'rgba(0, 0, 0, .2)' },
                  ]}
                  onPress={() => this.slider?.goToSlide(i, true)}
                />
              ))}
          </View>
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity
              style={[styles.button, {backgroundColor: '#023e3f'}]}>
              <Text style={styles.buttonText}>{API_TOKEN}</Text>
            </TouchableOpacity> */}
            <Button colorScheme={"success"} style={styles.button} onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.buttonText}>INGRESAR</Text>
            </Button>
          </View>
          </View>
        
      
    );
  };


  return (
    <ScrollView contentContainerStyle={{ flexGrow:1 }}>
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderPagination={renderPagination}
        data={data}
        ref={(ref) => slider = !ref}
      />
    </View>
    </ScrollView>
  );

}
