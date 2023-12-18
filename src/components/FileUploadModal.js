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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
                <MaterialIcons
                  name={'camera-alt'}
                  size={50}
                  color={Color.White}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onFilePress}>
                <MaterialIcons
                  name={'upload-file'}
                  size={50}
                  color={Color.White}
                />
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
    backgroundColor: Color.MoodyBlue,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default FileUploadModal;
