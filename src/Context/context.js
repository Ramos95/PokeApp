import React, {createContext, useEffect, useReducer} from 'react';
import {addPokemon, removePokemon, addTeam, removeTeam} from './contextHelpers';
import {
  INITIALIZEPOKEMONS,
  INITIALIZEREGIONS,
  INITIALIZE_USER,
  ADDTEAM,
  UPDATETEAM,
  REMOVETEAM,
  ADDPOKEMON,
  REMOVEPOKEMON,
  FETCHPOKEMONS,
} from './actions';

const InitialState = {
  teams: [],
  regions: [],
  currentTeam: 0,
  currentPokemons: [],
  isLoading: false,
  currentUser: {},
};

const store = createContext(InitialState);
const {Provider} = store;

const StateProvider = ({children, user}) => {
  useEffect(() => dispatch({type: INITIALIZE_USER, payload: user}), [user]);

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case INITIALIZEREGIONS:
        return {...state, regions: [...action.payload]};
      case INITIALIZEPOKEMONS:
        return {
          ...state,
          currentPokemons: [...action.payload],
          isLoading: false,
        };
      case INITIALIZE_USER:
        return {...state, currentUser: action.payload};
      case FETCHPOKEMONS:
        return {...state, isLoading: true};
      case ADDPOKEMON:
        return {...state, teams: addPokemon(state, action)};
      case REMOVEPOKEMON:
        return {...state, teams: removePokemon(state, action)};
      case ADDTEAM:
        return {...state, teams: addTeam(state, action)};
      case REMOVETEAM:
        return {...state, teams: removeTeam(state, action)};
      case UPDATETEAM:
        return {
          ...state,
          currentTeam: action.payload,
        };
      default:
        return state;
    }
  }, InitialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {store, StateProvider};
