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
import 'react-native-gesture-handler';
import type {Node} from 'react';

import MainNavigation from 'navigation/MainNavigation';
import AuthenticationStack from 'navigation/AuthenticationStack';
import {StateProvider} from 'context/Contex';

const App: () => Node = () => {
  const [user, setUser] = useState();
  const UserContext = React.createContext('user');

  function onAuthStateChanged(user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <StateProvider user={user}>
      <NavigationContainer>
        {user ? <MainNavigation /> : <AuthenticationStack />}
      </NavigationContainer>
    </StateProvider>
  );
};

export default App;
