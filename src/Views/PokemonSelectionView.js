import React, {useState, useContext} from 'react';
import {useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Alert,
} from 'react-native';
import PokemonList from 'components/lists/PokemonList';
import OptionModal from 'components/overlays/OptionModal';
import LoadingIndicator from 'components/LoadingIndicator';
import {getPokemonsByRegion, getRegions} from 'api/PokeApi';
import {
  FETCHPOKEMONS,
  ADDPOKEMON,
  REMOVEPOKEMON,
  INITIALIZEREGIONS,
  INITIALIZEPOKEMONS,
} from 'context/actions';
import {store} from 'context/context';

export default function PokemonSelectionView({navigation}) {
  const [visible, setVisible] = useState(false);
  const {dispatch, state} = useContext(store);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (state.teams[state.currentTeam].team.length >= 1) {
          return;
        }
        e.preventDefault();
        Alert.alert('You need at least 3 pokemons in your team!');
      }),
    [navigation],
  );

  const handleOnpress = (item, index, selected) => {
    let totalPokemons = state.teams[state.currentTeam].team.length;
    if (selected && totalPokemons < 6) {
      dispatch({
        type: ADDPOKEMON,
        payload: item,
      });
    } else if (!selected && totalPokemons > 0) {
      dispatch({
        type: REMOVEPOKEMON,
        payload: item.id,
      });
    }
  };

  const initialize = async () => {
    try {
      let response = await getRegions();
      dispatch({type: INITIALIZEREGIONS, payload: response.results});
      await setInitializePokemons(response.results[0].url);
    } catch (err) {
      console.log(err);
    }
  };

  const setInitializePokemons = async regionUrl => {
    try {
      dispatch({type: FETCHPOKEMONS, payload: pokemon});
      let pokemon = await getPokemonsByRegion(regionUrl);
      console.log(pokemon.slice(0, 1)[0].name);
      dispatch({type: INITIALIZEPOKEMONS, payload: pokemon});
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function setUp() {
      if (!state.regions.length && !state.currentPokemons.length) {
        await initialize();
      }
    }
    setUp();
  }, []);
  useEffect(() => {
    console.log(visible);
  }, [visible]);

  const handleOnOptionPressed = async ({item: {url}}) => {
    setVisible(false);
    await setInitializePokemons(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.slots}>
        <Text style={styles.textSlots}>
          Avalible Slots: {6 - state.teams[state.currentTeam].team.length}{' '}
        </Text>
      </View>

      <LoadingIndicator visible={state.isLoading} />

      <PokemonList
        data={state.currentPokemons}
        onPress={handleOnpress}
        currentTeam={state.teams[state.currentTeam].team}
      />

      <TouchableOpacity
        style={styles.regionButtom}
        onPress={() => setVisible(true)}>
        <Image
          source={require('../Assets/img/location.png')}
          style={{height: 45, width: 45}}
        />
      </TouchableOpacity>
      <OptionModal
        data={state.regions}
        handleOnpress={handleOnOptionPressed}
        visible={visible}
        setVisible={setVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slots: {
    width: '100%',
    height: 50,
    padding: 10,
  },
  textSlots: {
    fontWeight: 'bold',
    fontFamily: 'Quicksand-bold',
    color: '#0db39e',
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
