import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {signUp} from 'services/FirebaseService';

/* import {signUp} from '../services/firabaseSigIn'; */

const NewUser = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [page, SetPage] = useState(0);
  let screenWidth = Dimensions.get('window').width;
  const inputRef = [useRef(), useRef()];
  const scrollRef = useRef();

  useEffect(() => {
    //aqui escucha para luego hacer el scroll a la siguente pagina
    scrollRef.current.scrollTo({x: page * screenWidth, animated: true});
    page === 3 ? Keyboard.dismiss() : null;
  }, [page]);

  function handleEmailChange(email) {
    setEmail(email);
  }

  function handlePasswordChange(password) {
    setPassword(password);
  }

  function handleUserNameChange(userName) {
    setUserName(userName);
  }

  function handleConfirmPasswordChange(confirmPassword) {
    setConfirmPassword(confirmPassword);
  }

  function retroceder() {
    if (page > 0) {
      SetPage(page - 1);
    }
  }

  function avanzar() {
    if (page < 1) {
      SetPage(page + 1);
    }
  }

  function handleScroll(event) {
    let scrollPosition = event.nativeEvent.contentOffset.x;
    scrollPosition === 0
      ? inputRef[0].current.focus()
      : scrollPosition === screenWidth
      ? inputRef[1].current.focus()
      : scrollPosition === screenWidth * 2
      ? inputRef[2].current.focus()
      : null;
  }

  function handleCreateUserButtonPress() {
    if (password === confirmPassword) {
      signUp(email, password);
    } else {
      Alert.alert('La contraseña no coincide');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          onScroll={handleScroll}
          alwaysBounceHorizontal={false}
          ref={scrollRef}>
          <View style={styles.center}>
            <TextInput
              ref={inputRef[0]}
              style={styles.inputStyle}
              onChangeText={handleUserNameChange}
              placeholder="User"
            />
            <TextInput
              style={styles.inputStyle}
              autoCapitalize={'none'}
              onChangeText={handleEmailChange}
              placeholder="E-mail"
            />
          </View>

          <View style={styles.center}>
            <TextInput
              ref={inputRef[1]}
              style={styles.inputStyle}
              secureTextEntry
              autoCapitalize={'none'}
              onChangeText={handlePasswordChange}
              placeholder="Password"
            />
            <TextInput
              style={styles.inputStyle}
              secureTextEntry
              autoCapitalize={'none'}
              onChangeText={handleConfirmPasswordChange}
              placeholder="Confirm Password"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleCreateUserButtonPress}>
              <Text style={styles.buttonText}>Creat User</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={retroceder}>
          <Text
            style={{
              color: '#0db39e',
              fontSize: 15,
              fontFamily: 'Quicksand-Bold',
            }}>
            Prev
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={avanzar}>
          <Text
            style={{
              color: '#0db39e',
              fontSize: 15,
              fontFamily: 'Quicksand-Bold',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  center: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    width: '70%',
    marginBottom: 20,
    borderBottomColor: '#0db39e',
    borderBottomWidth: 1,
    color: '#0db39e',
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
  },
  content: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default NewUser;
