import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Color from '../utils/themes/colors';
import {SportyInputText} from '../components/SprtyInput';
import SportyButton from '../components/SportyButton';
const ForgotPassword = () => {
  const onClickLoginPress = () => {};

  return (
    <View style={styles.container}>
      <Image
        style={styles.logoStyle}
        source={require('../assets/images/LogoMedium.png')}
      />
      <SportyInputText
        placeholder="Email"
        leftIcon={require('../assets/images/mail.png')}
      />
      <SportyButton onPress={onClickLoginPress} title={'SUBMIT'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    alignItems: 'center',
  },
  logoStyle: {
    width: 180,
    height: 180,
    marginTop: '25%',
  },
  forgotTouchStyle: {
    minWidth: '80%',
    alignItems: 'flex-end',
  },
  forgotTextStyle: {
    fontSize: 15,
    height: 30,
    color: Color.PinkishPurple,
  },
  signupTextStyle: {
    fontSize: 15,
    height: 30,
    color: Color.PinkishPurple,
    marginBottom: '25%',
  },
});

export default ForgotPassword;
