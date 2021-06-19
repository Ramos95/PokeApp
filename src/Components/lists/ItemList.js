import React from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function ItemList({
  data,
  onPress,
  removable = false,
  removeFunction = null,
  optionStyle = null,
}) {
  const renderItem = ({item, index}) => (
    <View
      style={styles.regionCardContainer}
      onPress={() => console.log(item.name)}>
      <TouchableOpacity
        style={styles.regionTile}
        onPress={() => onPress({item, index})}>
        <Text style={styles.regionName}>{item.name.toUpperCase()}</Text>
      </TouchableOpacity>
      {removable ? removeButton(item) : null}
    </View>
  );

  const emptyComponent = () => (
    <View style={styles.emptyComponent}>
      <Image
        source={require('Assets/img/pokebola-outline.png')}
        style={{height: 100, width: 100}}
      />
      <Text style={styles.emptyText}>No Teams Yet!</Text>
    </View>
  );

  const removeButton = item => (
    <TouchableOpacity
      style={styles.removeButton}
      activeOpacity={0.6}
      onPress={() => removeFunction(item.name)}>
      <Text style={styles.removeText}>X</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      contentContainerStyle={{
        padding: 10,
      }}
      renderItem={renderItem}
      keyExtractor={item => Math.random()}
      numColumns={2}
      ListEmptyComponent={emptyComponent}
    />
  );
}

const styles = StyleSheet.create({
  regionCardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 70,
    marginTop: 5,
    marginBottom: 5,
  },
  regionTile: {
    width: '90%',
    height: '90%',
    backgroundColor: '#0db39e',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
    marginBottom: 10,
  },
  regionName: {
    height: '100%',
    width: '100%',
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
  },
  emptyComponent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: '100%',
  },
  emptyText: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    color: 'grey',
  },
  removeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 25,
    width: 25,
    borderRadius: 90,
    top: -10,
    right: 0,
    elevation: 20,
    backgroundColor: '#ff6b6b',
  },
  removeText: {
    color: 'white',
    fontFamily: 'Quicksand-Bold',
  },
});
