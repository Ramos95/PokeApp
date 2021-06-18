export const pokemonTypeStyle = type => {
  switch (type.toLowerCase()) {
    case 'normal':
      return {backgroundColor: '#A8A77A'};
    case 'fighting':
      return {backgroundColor: '#C22E28'};
    case 'flying':
      return {backgroundColor: '#A98FF3'};
    case 'poison':
      return {backgroundColor: '#A040A0'};
    case 'ground':
      return {backgroundColor: '#E2BF65'};
    case 'rock':
      return {backgroundColor: '#B6A136'};
    case 'ghost':
      return {backgroundColor: '#735797'};
    case 'fire':
      return {backgroundColor: '#EE8130'};
    case 'water':
      return {backgroundColor: '#6390F0'};
    case 'grass':
      return {backgroundColor: '#7AC74C'};
    case 'electric':
      return {backgroundColor: '#F7D02C'};
    case 'psychic':
      return {backgroundColor: '#F95587'};
    case 'ice':
      return {backgroundColor: '#96D9D6'};
    case 'steel':
      return {backgroundColor: '#B7B7CE'};
    case 'bug':
      return {backgroundColor: '#A6B91A'};
    case 'dragon':
      return {backgroundColor: '#6F35FC'};
    case 'fairy':
      return {backgroundColor: '#D685AD'};
    case 'dark':
      return {backgroundColor: '#705746'};

    default:
      return {backgroundColor: '#A8A77A'};
  }
};

export const bottomTabsIconSelector = (tab, isFocused) => {
  console.log(tab.toLowerCase());
  switch (tab.toLowerCase()) {
    case 'teams':
      return isFocused
        ? require('./Assets/img/pokemon-ir.png')
        : require('./Assets/img/pokemon-ir-outline.png');
    case 'home':
      return isFocused
        ? require('./Assets/img/pokebola.png')
        : require('./Assets/img/pokebola-outline.png');
    default:
      return require('./Assets/img/pokebola.png');
  }
};

export const filterFireStoreUpdateData = pkmTeams =>
  pkmTeams.map(({name, team}) => ({
    name,
    team: team.map(({id, name}) => ({id, name})),
  }));

//this can be adjusted to filter in other languages
export const filterLanguageDescription = (descriptions, lang = 'en') =>
  descriptions.find(
    descriptions => descriptions.language.name.localeCompare(lang) === 0,
  );
