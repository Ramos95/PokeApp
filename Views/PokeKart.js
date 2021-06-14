import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import PokemonList from '../Components/lists/PokemonList';
import OptionModal from '../Components/overlays/OptionModal';
import {store} from '../Context/Contex';

export default function PokemonSelectionView({navigation}) {
  const [visible, setVisible] = useState(false);
  const {dispatch, state} = useContext(store);

  const handleOnpress = pokemonData => {
    /* navigation.push('Pokemon Profile', {pokemonData}); */
    console.log(pokemonData);
  };

  return (
    <View style={styles.container}>
      <PokemonList data={state.pokeKart} onPress={handleOnpress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  regionButtom: {
    flex: 1,
    position: 'absolute',
    height: 60,
    width: 60,
    right: 10,
    bottom: 10,
    backgroundColor: 'skyblue',
    borderRadius: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
