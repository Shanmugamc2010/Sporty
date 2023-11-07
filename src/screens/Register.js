import React from 'react';
import {StyleSheet, ScrollView, Platform} from 'react-native';
import Color from '../utils/themes/colors';
import {SportyInputText} from '../components/SprtyInput';
import SportyButton from '../components/SportyButton';

const Register = () => {
  const onClickSignUpPress = () => {};

  return (
    <ScrollView style={styles.container}>
      <SportyInputText
        placeholder="First Name"
        leftIcon={require('../assets/images/user.png')}
      />
      <SportyInputText
        placeholder="Last Name"
        leftIcon={require('../assets/images/user.png')}
      />
      <SportyInputText
        placeholder="Mobile Number"
        leftIcon={require('../assets/images/smartphone.png')}
        keyboardType={
          Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number'
        }
      />
      <SportyInputText
        placeholder="Email"
        leftIcon={require('../assets/images/mail.png')}
      />
      <SportyInputText
        placeholder="State"
        leftIcon={require('../assets/images/location.png')}
      />
      <SportyInputText
        placeholder="District"
        leftIcon={require('../assets/images/location.png')}
      />
      <SportyInputText
        placeholder="Password"
        leftIcon={require('../assets/images/lock.png')}
        rightIcon={require('../assets/images/hide.png')}
      />
      <SportyInputText
        placeholder="Confirm Password"
        leftIcon={require('../assets/images/lock.png')}
        rightIcon={require('../assets/images/hide.png')}
      />
      <SportyInputText
        placeholder="Address"
        leftIcon={require('../assets/images/location.png')}
      />
      <SportyButton onPress={onClickSignUpPress} title={'REGISTER'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    padding: 10,
  },
});

export default Register;
