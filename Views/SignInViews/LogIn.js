import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {signIn} from '../../Services/FirebaseService';

const LogIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(email) {
    setEmail(email);
  }

  function handlePasswordChange(password) {
    setPassword(password);
  }

  function handleNewUserPress() {
    navigation.push('New User');
  }

  function handleStartSessionButtonPress() {
    signIn(email, password);
    console.log(email);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.center}>
          <View style={styles.inputs}>
            <TextInput
              style={styles.inputStyle}
              autoCapitalize="none"
              onChangeText={handleEmailChange}
              placeholder="User"
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={handlePasswordChange}
              placeholder="Password"
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleStartSessionButtonPress}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.newUser} onPress={handleNewUserPress}>
            <Text style={styles.newUserText}>Create Account</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  top: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputs: {
    width: '70%',
    fontFamily: 'Quicksand-Bold',
  },
  inputStyle: {
    marginBottom: 20,
    borderBottomColor: '#0db39e',
    borderBottomWidth: 1,
    color: '#0db39e',
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
  },
  button: {
    width: '40%',
    height: 40,
    marginTop: 20,
    backgroundColor: '#0db39e',
    borderRadius: 90,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Quicksand-Bold',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  newUser: {
    marginTop: 15,
    width: '40%',
    borderBottomColor: '#0db39e',
    borderBottomWidth: 1,
  },
  newUserText: {
    fontFamily: 'Quicksand-Bold',
    color: '#0db39e',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default LogIn;
