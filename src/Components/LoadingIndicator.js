import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {View, Animated, Modal, StyleSheet, Easing} from 'react-native';

export default function LoadingIndicator({visible}) {
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
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.spinnerContainer}>
          <Animated.Image
            style={{
              height: 100,
              width: 100,
              transform: [{rotate: rotateStyle}],
            }}
            source={require('../Assets/img/Poké_Ball_icon.svg.png')}
          />
          <Animated.Text style={[styles.text, {opacity: fadeAnim}]}>
            Loading ... {'\n'}
          </Animated.Text>
        </View>
      </View>
    </Modal>
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
    backgroundColor: 'rgba(200,200,200,0.6)',
  },
  spinnerContainer: {
    height: '50%',
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    color: '#2f354b',
    textAlign: 'center',
  },
});
