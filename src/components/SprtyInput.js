import React from 'react';
import {TextInput, StyleSheet, View, Image} from 'react-native';
import Color from '../utils/themes/colors';

export const SportyInputText = props => {
  return (
    <View style={styles.inputBgView}>
      <Image style={styles.iconsStyle} source={props.leftIcon} />
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        cursorColor={Color.MoodyBlue}
        placeholderTextColor={Color.MoodyBlue}
        value={props.value}
        color={Color.PinkishPurple}
        onChangeText={props.onChangeText}
        {...props}
      />
      <Image style={styles.iconsStyle} source={props.rightIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBgView: {
    height: 50,
    margin: 10,
    borderWidth: 0.5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    minWidth: '80%',
    borderRadius: 10,
    borderColor: Color.MoodyBlue,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconsStyle: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Color.DeepRose,
  },
});
