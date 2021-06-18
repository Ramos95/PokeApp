import auth from '@react-native-firebase/auth';
import {createUserDocument} from './FireStoreService';

const signIn = (email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

const signUp = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      /*when user is created then also create a document with
      his id where the user info will be stored*/
      console.log(user.user.uid);
      createUserDocument(user.user.uid);
      console.log('User account created & signed in!');
      return user;
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

const logOut = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
  console.log('firebase out');
};

export {signIn, signUp, logOut};
