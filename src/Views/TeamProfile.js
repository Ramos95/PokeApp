import React, {useEffect, useContext} from 'react';
import {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {getPokemonDescription} from 'API/PokeApi';
import PokemonList from 'Components/lists/PokemonList';
import {REMOVEPOKEMON} from 'Context/actions';
import {store} from 'Context/context';

export default function TeamProfile({navigation}) {
  const [pkm, setPkm] = useState([]);
  const {dispatch, state} = useContext(store);

  const goToPokemons = () => {
    navigation.push('Pokemon');
  };

  const handleOnOptionPressed = item => {
    dispatch({type: REMOVEPOKEMON, payload: item.id});
  };

  const addDescription = descriptions => {
    let pokemons = state.teams[state.currentTeam].team;
    let pkmDesctription = pokemons.map((pkm, index) => ({
      ...pkm,
      ...descriptions[index],
    }));
    setPkm([...pkmDesctription]);
  };

  useEffect(() => {
    async function setUp() {
      let speciesUrls = state.teams[state.currentTeam].team.map(
        pkm => pkm.species.url,
      );
      let descriptions = await getPokemonDescription(speciesUrls);
      addDescription(descriptions);
    }
    setUp();
  }, []);

  return (
    <View style={styles.container}>
      <PokemonList data={pkm} onPress={handleOnOptionPressed} isTeam={true} />

      {state.teams[state.currentTeam].team.length === 6 ? null : (
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.6}
          onPress={goToPokemons}>
          <Image
            source={require('Assets/img/pokemon-ir.png')}
            style={{height: 45, width: 45}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    /* flexDirection: 'row',
    flexWrap: 'wrap', */
  },
  bottom: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },

  addButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    height: 90,
    backgroundColor: '#0db39e',
    position: 'absolute',
    bottom: 15,
    right: '5%',
    borderRadius: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.6,
    shadowRadius: 9.51,
    elevation: 15,
  },
});
