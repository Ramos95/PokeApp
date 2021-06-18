import React, {createContext, useReducer} from 'react';
import reducer from './reducer';

const store = createContext('context');
const {Provider} = store;

const addTeam = ({teams}, {payload}) => [...teams, payload];

const removeTeam = ({teams}, {payload}) =>
  teams.filter(team => team.name.localeCompare(payload));

const StateProvider = ({children, initialState}) => {
  const [state, dispatch] = useReducer(
    (state, action) => reducer(state, action),
    initialState,
  );

  /* useEffect(() => console.log(initialState), [initialState]); */

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {store, StateProvider};
