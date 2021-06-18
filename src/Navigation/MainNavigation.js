import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from 'views/Home';
import PokemonSelectionView from 'views/PokemonSelectionView';
import TeamProfile from 'views/TeamProfile';
import {Alert, Button} from 'react-native';
import {logOut} from 'services/FirebaseService';
import {updateCurrentTeam} from 'services/FireStoreService';
import {store} from 'context/Contex';
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
          ? updateCurrentTeam(state.currentUser['_user']['uid'], state.teams)
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
          headerTitleStyle: {color: '#0db39e', fontFamily: 'Quicksand-Bold'},
          headerTintColor: '#0db39e',
        }}
      />
      <PokemonStack.Screen
        name="Pokemon"
        component={PokemonSelectionView}
        options={{
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
