import React, {createContext, useEffect, useReducer} from 'react';
import {useState} from 'react';

const initialState = {
  teams: [],
  regions: [],
  currentTeam: 0,
  currentPokemons: [],
  isLoading: false,
  currentUser: {},
};

const store = createContext(initialState);
const {Provider} = store;

const addPokemon = ({teams, currentTeam}, {payload}) => {
  let exists = teams[currentTeam].team.some(item => item.id === payload.id);
  if (!exists) {
    let teamToUpdate = [...teams];
    teamToUpdate[currentTeam].team.push(payload);
    return teams;
  } else {
    return teams;
  }
};

const removePokemon = ({teams, currentTeam}, {payload}) => {
  if (teams[currentTeam].team) {
    let teamToUpdate = [...teams];
    let exist = teams[currentTeam].team.some(item => item.id === payload);
    if (exist) {
      teamToUpdate[currentTeam].team = [
        ...teams[currentTeam].team.filter(pokemon => pokemon.id !== payload),
      ];
      return teamToUpdate;
    } else {
      return teams;
    }
  } else {
    return teams;
  }
};

const addTeam = ({teams}, {payload}) => [...teams, payload];

const removeTeam = ({teams}, {payload}) =>
  teams.filter(team => team.name.localeCompare(payload));

const StateProvider = ({children, user}) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'initializeRegions':
        return {...state, regions: [...action.payload]};
      case 'initiaizePokemons':
        return {
          ...state,
          currentPokemons: [...action.payload],
          isLoading: false,
        };
      case 'initializeUser':
        return {...state, currentUser: {...action.payload}};
      case 'fetchingPokemons':
        return {...state, isLoading: true};
      case 'addPokemon':
        return {...state, teams: addPokemon(state, action)};
      case 'removePokemon':
        return {...state, teams: removePokemon(state, action)};
      case 'addTeam':
        return {...state, teams: addTeam(state, action)};
      case 'removeTeam':
        return {...state, teams: removeTeam(state, action)};
      case 'updateCurrentTeam':
        return {
          ...state,
          currentTeam: action.payload,
        };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    dispatch({type: 'initializeUser', payload: user});
  }, [user]);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {store, StateProvider};
