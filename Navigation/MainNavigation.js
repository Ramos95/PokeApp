import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Views/Home';
import PokemonSelectionView from '../Views/PokemonSelectionView';
import TeamProfile from '../Views/TeamProfile';
import {Alert, Button} from 'react-native';
import {logOut} from '../Services/FirebaseService';
import {updateCurrentTeam} from '../Services/FireStoreService';
import {store} from '../Context/Contex';
import {useContext} from 'react';

export default function Navigation({user}) {
  const PokemonStack = createStackNavigator();
  const {state} = useContext(store);

  const logOutButton = () => (
    <Button color="#ff6b6b" title="log out" onPress={() => logOut()} />
  );

  const saveTeamButton = () => (
    <Button
      color="#0db39e"
      title="Save"
      onPress={() =>
        state.teams.length > 0
          ? updateCurrentTeam('CPe7wFG2QcRcglsqwHvzbr6uhtg2', state.teams)
          : Alert.alert('Teams are empty')
      }
    />
  );

  const PokemonStackScreen = () => (
    <PokemonStack.Navigator>
      <PokemonStack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => logOutButton(),
          //headerStyle: {backgroundColor: '#0db39e'},
          headerTitleStyle: {color: '#0db39e', fontFamily: 'Quicksand-Bold'},
          headerTintColor: '#0db39e',
        }}
      />
      <PokemonStack.Screen
        name="Pokemons"
        component={PokemonSelectionView}
        options={{
          //headerStyle: {backgroundColor: '#0db39e'},
          headerTitleStyle: {color: '#0db39e', fontFamily: 'Quicksand-Bold'},
          headerTintColor: '#0db39e',
        }}
      />

      <PokemonStack.Screen
        name="Team Profile"
        component={TeamProfile}
        options={{
          headerRight: () => saveTeamButton(),
          headerTitleStyle: {color: '#0db39e', fontFamily: 'Quicksand-Bold'},
          headerTintColor: '#0db39e',
        }}
      />
    </PokemonStack.Navigator>
  );

  return <PokemonStackScreen />;
}
