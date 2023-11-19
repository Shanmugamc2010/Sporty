import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {FONT_NAME} from '../utils/themes/FontName';
import Color from '../utils/themes/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SportyModal = ({data, visible, onClose, onPress}) => {
  const renderItem = ({item}) => (
    <View style={styles.textContentContainer}>
      <TouchableOpacity onPress={() => onPress(item)}>
        <Text style={styles.textContentStyle}>{item}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={styles.cancelIconContainer}>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons
                name={FONT_NAME.CANCEL}
                size={25}
                color={Color.Black}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item}
            style={styles.flatListStyle}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Color.OverLay,
    paddingHorizontal: 15,
  },
  modalContainer: {
    maxHeight: '70%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContentContainer: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.PinkishPurple,
  },
  textContentStyle: {
    fontFamily: FONT_NAME.SEMI_BOLD,
    color: Color.MoodyBlue,
    fontSize: 16,
  },
  cancelIconContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    padding: 5,
  },
  flatListStyle: {
    width: '100%',
  },
});

export default SportyModal;
