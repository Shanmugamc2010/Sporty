import React, {useEffect, useState} from 'react';
import {View, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import Color from '../utils/themes/colors';
import {useSelector} from 'react-redux';

const SportyLoader = () => {
  //   console.log(visible);
  const showLoader = useSelector(state => state.isLoading);
  const [visible, setModalVisible] = useState(false);
  useEffect(() => {
    setModalVisible(showLoader);
  }, [showLoader, visible]);

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <ActivityIndicator
            style={styles.loaderContainerStyle}
            animating={true}
            size={'large'}
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
    maxHeight: '50%',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  loaderContainerStyle: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
});

export default SportyLoader;
