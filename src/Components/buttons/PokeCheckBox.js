import React, {useState} from 'react';
import {TouchableOpacity, Image, View, StyleSheet} from 'react-native';

export default function PokeCheckedIndicator({selected}) {
  return (
    <View style={styles.container} activeOpacity={1}>
      <Image
        style={{height: 30, width: 30, borderColor: 'black'}}
        source={
          selected
            ? require('../../Assets/img/pokebola.png')
            : require('../../Assets/img/pokebola-outline.png')
        }
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
  },
  emptyView: {
    height: 30,
    width: 30,
    borderWidth: 3,
    borderRadius: 180,
    borderColor: 'black',
    width: '100%',
    height: '100%',
  },
});
