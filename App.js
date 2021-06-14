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
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import MainNavigation from './Navigation/MainNavigation';
import AuthenticationStack from './Navigation/AuthenticationStack';
import {StateProvider} from './Context/Contex';

const App: () => Node = () => {
  const [user, setUser] = useState();
  const UserContext = React.createContext('user');

  function onAuthStateChanged(user) {
    //console.log(user);
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

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
