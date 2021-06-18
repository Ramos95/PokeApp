import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {FlatList, View, Image, Text, StyleSheet} from 'react-native';
import PokemonCard from 'components/cards/PokemonCard';
import PokemonTeamCard from 'components/cards/PokemonTeamCard';

export default function PokemonList({data, onPress, isTeam, currentTeam = []}) {
  const [selectedPokemon, setSelectedPokemon] = useState([]);

  useEffect(() => {
    currentTeam.length && setSelectedPokemon(currentTeam.map(pkm => pkm.id));
  }, []);

  const handleOnOptionPressed = (item, index) => {
    let isSelected = updateSelectedPokemon(item);
    onPress(item, index, isSelected);
  };

  const renderPokemonCard = (item, index) => (
    <PokemonCard
      pokemonData={item}
      onPress={() => handleOnOptionPressed(item, index)}
      index={index}
      isSelected={isSelected(item)}
    />
  );

  const renderPokemonTeamCard = (item, index) => (
    <PokemonTeamCard
      pokemonData={item}
      index={index}
      onPress={() => onPress(item)}
    />
  );

  const renderItem = ({item, index}) =>
    isTeam
      ? renderPokemonTeamCard(item, index)
      : renderPokemonCard(item, index);

  const keyExtractor = item => item.id;

  const emptyComponent = () => (
    <View style={styles.emptyComponent}>
      <Image
        source={require('../../Assets/img/pokebola-outline.png')}
        style={{height: 100, width: 100}}
      />
      <Text style={styles.emptyText}>No Pokemons Yet!</Text>
    </View>
  );

  const isSelected = ({id}) => {
    return selectedPokemon.includes(id);
  };

  const updateSelectedPokemon = ({id}) => {
    if (!selectedPokemon.includes(id)) {
      setSelectedPokemon([...selectedPokemon, id]);
      return true;
    } else {
      setSelectedPokemon(selectedPokemon.filter(pkID => pkID !== id));
      return false;
    }
  };

  return (
    <FlatList
      data={data}
      contentContainerStyle={{
        padding: 5,
      }}
      windowSize={10}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={emptyComponent}
    />
  );
}

const styles = StyleSheet.create({
  /* pokemonList: {
    //flex: 1,
    width: '100%',
    backgroundColor: 'whitesmoke',
  }, */
  emptyComponent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
  },
  emptyText: {
    fontSize: 20,
    color: 'grey',
    fontFamily: 'Quicksand-Bold',
  },
});
