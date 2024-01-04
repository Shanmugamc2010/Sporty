import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {SportyInputText} from '../components/SprtyInput';
import SportyButton from '../components/SportyButton';
import {apiCall} from '../apimanager/ApiManager';
import {ApiNetwork} from '../apimanager/ApiNetwork';
import {useSelector} from 'react-redux';
import {getLoginData} from '../Redux/Selector';

const ResetPassword = () => {
  const loginData = useSelector(state => getLoginData(state));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const onPress = async () => {
    const response = await apiCall(
      ApiNetwork.resetPasswordApiCall({
        email,
        password,
        confirmPassword,
        token: loginData?.token,
      }),
    );
    console.log(response);
  };
  return (
    <View>
      <SportyInputText
        placeholder="Email"
        leftIcon={require('../assets/images/mail.png')}
        keyboardType={'email-address'}
        autoCapitalize="none"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <SportyInputText
        placeholder="Password"
        leftIcon={require('../assets/images/lock.png')}
        autoCapitalize="none"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <SportyInputText
        placeholder="Confirm Password"
        leftIcon={require('../assets/images/lock.png')}
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />

      <SportyButton title={'Submit'} onPress={onPress} />
    </View>
  );
};

export default ResetPassword;
