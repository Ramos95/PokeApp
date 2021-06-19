import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ItemList from 'Components/lists/ItemList';
import {ADDTEAM, REMOVETEAM, UPDATETEAM} from 'Context/actions';
import {store} from 'Context/context';

export default function Home({navigation}) {
  const [isLoading, setIsloading] = useState(true);
  const {dispatch, state} = useContext(store);

  const data = [
    {name: 'kanto', url: 'https://pokeapi.co/API/v2/region/1/'},
    {name: 'johto', url: 'https://pokeapi.co/API/v2/region/2/'},
    {name: 'hoenn', url: 'https://pokeapi.co/API/v2/region/3/'},
    {name: 'sinnoh', url: 'https://pokeapi.co/API/v2/region/4/'},
    {name: 'unova', url: 'https://pokeapi.co/API/v2/region/5/'},
    {name: 'kalos', url: 'https://pokeapi.co/API/v2/region/6/'},
    {name: 'alola', url: 'https://pokeapi.co/API/v2/region/7/'},
    {name: 'galar', url: 'https://pokeapi.co/API/v2/region/8/'},
    {name: 'see all', url: 'https://pokeapi.co/API/v2/region/8/'},
  ];

  const selectTeam = ({item, index}) => {
    dispatch({type: UPDATETEAM, payload: index});
    navigation.push('Team Profile');
  };

  const createTeam = () => {
    let currentLegnt = state.teams.length + 1;
    dispatch({
      type: ADDTEAM,
      payload: {name: `TEAM ${currentLegnt}`, team: []},
    });
  };

  const removeTeam = name => {
    dispatch({type: REMOVETEAM, payload: name});
  };

  /* useEffect(() => {
    dispatch({type: 'initialize', payload: data});
  }, []); */

  return (
    <View style={styles.container}>
      <ItemList
        data={state.teams}
        onPress={selectTeam}
        removable
        removeFunction={removeTeam}
      />
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.6}
        onPress={createTeam}>
        <Text style={styles.optionText}>New team</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  options: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    width: '100%',
    height: 30,
  },
  addButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 45,
    backgroundColor: '#0db39e',
    position: 'absolute',
    bottom: 0,
    left: '30%',
    borderRadius: 90,
    marginBottom: 10,
  },
  optionText: {
    fontFamily: 'Quicksand-Bold',
    color: 'white',
  },
});
