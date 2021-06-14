import React, {useContext} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ItemList from '../lists/ItemList';
import {store} from '../../Context/Contex';

export default function OptionModal({
  data,
  visible,
  setVisible,
  handleOnpress,
}) {
  const {dispatch, state} = useContext(store);

  const toggle = () => {
    setVisible(false);
  };

  return (
    <Modal animationType="slide" visible={visible} transparent>
      <View style={styles.centeredView}>
        <Text style={styles.title}>SELECT A REGION</Text>
        <ItemList data={data} onPress={handleOnpress} />
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={() => toggle()}>
        <Text style={[styles.textStyle, styles.cancelText]}>Close</Text>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    //left: Dimensions.get('window').width * 0.49,
    marginTop: Dimensions.get('window').height * 0.1,
  },
  openButton: {
    width: '50%',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#0db39e',
    borderRadius: 20,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Quicksand-Bold',
    fontSize: 15,
  },
  title: {
    textAlign: 'center',
    color: '#0db39e',
    fontFamily: 'Quicksand-Bold',
    padding: 10,
  },
  cancelText: {
    color: 'white',
  },
  closeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 45,
    backgroundColor: '#ff6b6b',
    position: 'absolute',
    bottom: 0,
    left: '30%',
    borderRadius: 90,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ff6b6b',
  },
});
