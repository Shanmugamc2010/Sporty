import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Color from '../utils/themes/colors';

const SportyButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.touchStyle, props?.buttonstyle ? props.buttonstyle : {}]}>
      <Text style={styles.touchText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchStyle: {
    height: 50,
    minWidth: '80%',
    margin: 10,
    backgroundColor: Color.PinkishPurple,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchText: {
    color: Color.White,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SportyButton;
