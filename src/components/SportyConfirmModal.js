import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {FONT_NAME} from '../utils/themes/FontName';
import Color from '../utils/themes/colors';

const SportyConfirmModal = ({title, visible, onClose, onPress}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={[styles.textContentStyle, {color: Color.PinkishPurple}]}>
            {title}
          </Text>
          <View style={styles.buttonContainerStyle}>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.textContentStyle, {color: Color.MoodyBlue}]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
              <Text style={[styles.textContentStyle, {color: Color.MoodyBlue}]}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
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
    maxHeight: '50%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textContentStyle: {
    fontFamily: FONT_NAME.SEMI_BOLD,
    fontSize: 16,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default SportyConfirmModal;
