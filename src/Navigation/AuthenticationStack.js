import React from 'react';
import LogIn from 'Views/SignInViews/LogIn';
import NewUser from 'Views/SignInViews/NewUser';
import {createStackNavigator} from '@react-navigation/stack';

export default function AuthenticationStack() {
  const SignInStack = createStackNavigator();

  const SignInStackScreen = () => (
    <SignInStack.Navigator
      headerMode="none"
      screenOptions={{headerShown: false}}>
      <SignInStack.Screen name="Log In" component={LogIn} />
      <SignInStack.Screen name="New User" component={NewUser} />
    </SignInStack.Navigator>
  );

  return <SignInStackScreen />;
}
