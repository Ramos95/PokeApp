import {
  INITIALIZEPOKEMONS,
  INITIALIZEREGIONS,
  ADDTEAM,
  UPDATETEAM,
  REMOVETEAM,
  ADDPOKEMON,
  REMOVEPOKEMON,
  FETCHPOKEMONS,
} from './actions';

const addTeam = ({teams}, {payload}) => [...teams, payload];

const removeTeam = ({teams}, {payload}) =>
  teams.filter(team => team.name.localeCompare(payload));

export const addPokemon = ({teams, currentTeam}, {payload}) => {
  let exists = teams[currentTeam].team.some(item => item.id === payload.id);
  if (!exists) {
    let teamToUpdate = [...teams];
    teamToUpdate[currentTeam].team.push(payload);
    return teams;
  } else {
    return teams;
  }
};

export const removePokemon = ({teams, currentTeam}, {payload}) => {
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

export default function reducer(action, state) {
  switch (action.type) {
    case INITIALIZEREGIONS:
      return {...state, regions: [...action.payload]};
    case INITIALIZEPOKEMONS:
      return {
        ...state,
        currentPokemons: [...action.payload],
        isLoading: false,
      };
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
}
