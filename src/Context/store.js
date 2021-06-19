const createStore = state => ({
  teams: [],
  regions: [],
  currentTeam: 0,
  currentPokemons: [],
  isLoading: false,
  currentUser: {},
  ...state,
});

export default createStore;
