import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {View, Animated, StyleSheet, Easing} from 'react-native';

export default function LoadingIndicator() {
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0));
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start(() => rotateValue.setValue(0));
  };

  const rotateStyle = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    startRotation();
    startPulseAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={{height: 100, width: 100, transform: [{rotate: rotateStyle}]}}
        source={require('../Assets/img/Poké_Ball_icon.svg.png')}
      />
      <Animated.Text style={[styles.text, {opacity: fadeAnim}]}>
        Cargando ... {'\n'}
        Cargando
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  text: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    color: '#2f354b',
    textAlign: 'center',
  },
});
