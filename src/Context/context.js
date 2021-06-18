import React, {createContext, useReducer} from 'react';
import reducer from './reducer';

const store = createContext('context');
const {Provider} = store;

const StateProvider = ({children, initialState}) => {
  const [state, dispatch] = useReducer(
    (state, action) => reducer(state, action),
    initialState,
  );

  /* useEffect(() => console.log(initialState), [initialState]); */

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {store, StateProvider};
