import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Color from '../utils/themes/colors';
const FileUploadModal = ({visible, onClose, onCameraPress, onFilePress}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={onCameraPress}>
                <Text>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onFilePress}>
                <Text>Open File Picker</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Color.OverLay,
  },
  iconContainer: {
    height: '20%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default FileUploadModal;
