import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Color from '../utils/themes/colors';
import {SportyInputText} from '../components/SprtyInput';
import SportyButton from '../components/SportyButton';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_TYPE} from '../utils/themes/constant';
import {CommonActions} from '@react-navigation/native';
import {ApiNetwork} from '../apimanager/ApiNetwork';
import {apiCall} from '../apimanager/ApiManager';

const Login = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChangedText = text => {
    setEmail(text);
  };
  const onPasswordChangedText = text => {
    setPassword(text);
  };
  const onClickLoginPress = async () => {
    console.log(email);
    console.log(password);
    const response = await apiCall(
      ApiNetwork.makeLoginApiCall({username: email, password: password}),
    );
    if (response?.token) {
      navigator.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: SCREEN_TYPE.DASHBOARD.name}],
        }),
      );
    }
  };

  const onClickSignUpPress = () => {
    navigator.navigate(SCREEN_TYPE.REGISTER.name);
  };
  const onClickForgotPassword = () => {
    navigator.navigate(SCREEN_TYPE.FORGOT_PASSWORD.name);
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoStyle}
        source={require('../assets/images/LogoMedium.png')}
      />
      <SportyInputText
        placeholder="Email"
        leftIcon={require('../assets/images/mail.png')}
        onChangeText={onEmailChangedText}
      />
      <SportyInputText
        placeholder="Password"
        leftIcon={require('../assets/images/lock.png')}
        rightIcon={require('../assets/images/hide.png')}
        onChangeText={onPasswordChangedText}
      />
      <SportyButton onPress={onClickLoginPress} title={'LOG IN'} />
      <TouchableOpacity
        onPress={onClickForgotPassword}
        style={styles.forgotTouchStyle}>
        <Text style={styles.forgotTextStyle}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.fullViewStyle} />
      <TouchableOpacity onPress={onClickSignUpPress}>
        <Text style={styles.signupTextStyle}>Create New Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fullViewStyle: {
    flex: 1,
  },
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
    fontStyle: 'italic',
    fontWeight: '300',
    color: Color.PinkishPurple,
  },
  signupTextStyle: {
    fontSize: 16,
    fontWeight: '300',
    height: 30,
    color: Color.PinkishPurple,
    marginBottom: '25%',
  },
});

export default Login;
