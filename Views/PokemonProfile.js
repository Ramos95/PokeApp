import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {pokemonTypeStyle} from '../utils';
import PokeCheckBox from '../Components/buttons/PokeCheckBox';

export default function PokemonProfile({route, navigation}) {
  const {pokemonData} = route.params;
  const species = {
    flavor_text_entries: [
      {
        flavor_text:
          'A strange seed was planted on its back at birth.The plant sprouts and grows with this POKéMON.',
      },
    ],
    generation: {
      name: 'generaion-i',
    },
  };
  return (
    <View style={styles.container}>
      {/*-----------------HEADER---------------------------*/}

      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              width: '100%',
              height: '30%',
              borderRadius: 30,
              alignItems: 'center',
            }}>
            <Image
              style={styles.image}
              source={{
                uri: pokemonData.sprites.other['official-artwork']
                  .front_default,
              }}
              resizeMode="cover"
            />
            <View style={[styles.hoverview]}>
              <Text style={[styles.title, {marginTop: 10}]}>
                {pokemonData.id}
              </Text>
              <Text style={styles.title}>{pokemonData.name}</Text>
              <View style={styles.section}>
                {pokemonData.types.map(({type}, index) => (
                  <Text style={pokemonTypeStyle(type.name)} key={index}>
                    {type.name.toUpperCase()}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.detailsview}>
              <Text style={styles.subtitle}>Description</Text>
              <Text style={styles.normalText}>
                First appereance: {species.generation.name}
                {'\n'}
              </Text>
              <Text style={styles.normalText}>
                {species.flavor_text_entries[0].flavor_text}
              </Text>

              <Text style={styles.normalText}></Text>
            </View>
            <View style={styles.detailsview}>
              <Text style={styles.subtitle}>Detalles</Text>
              {pokemonData.stats.map((stat, index) => (
                <Text key={index}>
                  {stat.stat.name}: {stat.base_stat}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      {/*------------------VIEW DE CONFIRMAR------------------------*/}
      <View style={styles.bottom}>
        <View style={{width: '50%', alignItems: 'center'}}>
          <TouchableOpacity
            width="50%"
            height={30}
            textColor="black"
            displayText="Agregar"
            //onPressHandler={comprobarExistencia}
          >
            <Text>Add to team</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flex: 2,
  },
  body: {
    height: '90%',
    width: '100%',
    backgroundColor: 'white',
  },
  bottom: {
    height: '10%',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ed424a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsview: {
    marginTop: 10,
    marginBottom: 10,
    width: '95%',
    height: 200,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'black',
    padding: 15,
  },
  hoverview: {
    borderRadius: 20,
    width: '100%',

    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
  },
  subtitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
  },
  normalText: {
    fontSize: 15,
  },
  image: {
    width: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 100,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
});
