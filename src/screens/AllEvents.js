import React, {useRef, useState} from 'react';
import {Button, View, Text, Alert, Modal, PanResponder} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FileUploadModal from '../components/FileUploadModal';
import SportyModal from '../components/SportyModal';

const AllEvents = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const onClose = () => {
    setModalVisible(false);
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (e, gestureState) => {
        console.log(gestureState.dy);
        if (gestureState.dy > 50) {
          console.log(gestureState.dy);
          // onClose();
        }
      },
    }),
  ).current;

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        presentationStyle="formSheet"
        onRequestClose={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'blue',
          }}
        />
      </Modal>
    </View>
  );
};

export default AllEvents;
