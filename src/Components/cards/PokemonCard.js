import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {pokemonTypeStyle} from '../../utils';
import PokeCheckedIndicator from 'Components/buttons/PokeCheckBox';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function PokemonCard({pokemonData, onPress, isSelected, index}) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.pokemonTile}
      onPress={() => onPress()}>
      <View style={styles.description}>
        <View style={styles.section}>
          <Text style={styles.pokemonName}>{`#${pokemonData.id}`}</Text>
          <Text style={styles.pokemonName}>
            {pokemonData.name.toUpperCase()}
          </Text>
          <PokeCheckedIndicator selected={isSelected} />
        </View>
        <View style={styles.section}>
          {pokemonData.types.map(({type}, index) => (
            <Text
              style={[styles.pokemonType, pokemonTypeStyle(type.name)]}
              key={index}>
              {type.name.toUpperCase()}
            </Text>
          ))}
        </View>
      </View>
      <View
        style={[
          styles.picture,
          pokemonTypeStyle(pokemonData.types[0].type.name),
        ]}>
        <Image
          style={{height: 75, width: 75}}
          source={{
            uri: pokemonData.sprites.other['official-artwork'].front_default,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pokemonCardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - 5,
    height: 120,
    padding: 5,
  },
  pokemonTile: {
    flex: 1,
    width: windowWidth - 10,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    marginBottom: 10,
  },
  picture: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '30%',
    //backgroundColor: '#f0efeb',
    borderTopLeftRadius: 180,
    borderBottomLeftRadius: 180,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  description: {
    height: '100%',
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  pokemonName: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 14,
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '50%',
    width: '100%',
  },
  pokemonType: {
    padding: 1,
    borderRadius: 15,
    width: '40%',
    height: 25,
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
    color: 'white',
  },
});
