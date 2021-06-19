export const addTeam = ({teams}, {payload}) => [...teams, payload];

export const removeTeam = ({teams}, {payload}) =>
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
