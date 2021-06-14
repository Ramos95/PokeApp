import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {pokemonTypeStyle} from '../../utils';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function PokemonTeamCard({pokemonData, onPress}) {
  return (
    <View style={styles.pokemonCardContainer}>
      <View activeOpacity={1} style={styles.pokemonTile}>
        <View
          style={[
            styles.header,
            pokemonTypeStyle(pokemonData.types[0].type.name),
          ]}>
          <Image
            style={{
              height: 150,
              width: 150,
            }}
            source={{
              uri: pokemonData.sprites.other['official-artwork'].front_default,
            }}
          />
          <Text style={styles.pokemonName}>{pokemonData.id}</Text>
          <Text style={styles.pokemonName}>
            {pokemonData.name.toUpperCase()}
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.textDescription}>
            {pokemonData.description.replace(/(\r\n|\n|\r)/gm, '')}
          </Text>
        </View>
        <View style={styles.types}>
          {pokemonData.types.map(({type}, index) => (
            <View
              key={index}
              style={[styles.pokemonType, pokemonTypeStyle(type.name)]}>
              <Text style={styles.pokemonTypeText}>{type.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        activeOpacity={0.6}
        onPress={() => onPress()}>
        <Text style={styles.removeText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pokemonCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
    height: 395,
  },
  pokemonTile: {
    width: '95%',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  header: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    //backgroundColor: '#a9def9',
  },
  textDescription: {
    fontFamily: 'Quicksand-Medium',
  },
  description: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 90,
  },
  types: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: 20,
  },
  pokemonName: {
    fontFamily: 'Quicksand-Bold',
    color: 'white',
    fontSize: 20,
  },

  removeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 90,
    top: 0,
    right: 0,
    elevation: 20,
    backgroundColor: '#ff6b6b',
  },
  removeText: {
    color: 'white',
    fontFamily: 'Quicksand-Bold',
  },
  pokemonTypeText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Quicksand-Bold',
    textTransform: 'uppercase',
  },
  pokemonType: {
    padding: 1,
    borderRadius: 15,
    width: '40%',
    height: 25,
  },
});
