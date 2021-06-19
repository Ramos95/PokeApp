/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import createStore from 'Context/store';
import 'react-native-gesture-handler';
import type {Node} from 'react';

import MainNavigation from 'Navigation/MainNavigation';
import AuthenticationStack from 'Navigation/AuthenticationStack';
import {StateProvider} from 'Context/context';

const App: () => Node = () => {
  const [initialState, setInitialState] = useState({});

  function onAuthStateChanged(user) {
    setInitialState(createStore({currentUser: user['_user']}));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <StateProvider initialState={initialState}>
      <NavigationContainer>
        {initialState.currentUser ? (
          <MainNavigation />
        ) : (
          <AuthenticationStack />
        )}
      </NavigationContainer>
    </StateProvider>
  );
};

export default App;
