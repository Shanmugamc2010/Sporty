import React, {useState} from 'react';
import {Button, View, Text, Alert} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FileUploadModal from '../components/FileUploadModal';
import SportyModal from '../components/SportyModal';

const AllEvents = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const handleCameraPress = () => {
    launchCamera({}, response => {
      if (response.error) {
        Alert.alert('Error', 'Failed to open camera');
      } else {
        console.log('Camera Response:', response);
      }
      setModalVisible(false);
    });
  };

  const handleFilePress = () => {
    launchImageLibrary({}, response => {
      if (response.error) {
        Alert.alert('Error', 'Failed to open file picker');
      } else {
        console.log('File Picker Response:', response);
      }
      setModalVisible(false);
    });
  };
  const handleUploadPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <SportyModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        onPress={() => {}}
      />
    </View>
  );
};

export default AllEvents;
