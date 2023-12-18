import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import Color from '../utils/themes/colors';
import {SportyInputText} from '../components/SprtyInput';
import SportyButton from '../components/SportyButton';
import {EVENT_TYPES} from '../utils/themes/constant';
import {isValidString} from '../utils/helper';
import {ApiNetwork} from '../apimanager/ApiNetwork';
import {apiCall} from '../apimanager/ApiManager';
import {useSelector} from 'react-redux';
import {getStateData} from '../Redux/Selector';
import SportyModal from '../components/SportyModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Register = () => {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [location, setLocation] = useState('');
  const [stateData, setStateData] = useState('');
  const [districtList, setDistrictList] = useState([]);
  const [districtData, setDistrictData] = useState('');
  const [activeField, setActiveField] = useState('');
  const [sportyModalVisible, setSportyModalVisible] = useState(false);
  const stateDataSelector = useSelector(state => getStateData(state));

  const onClickSignUpPress = async () => {
    let message = '';
    if (fname === '') {
      message = 'Enter first name';
    } else if (lname === '') {
      message = 'Enter last name';
    } else if (phone === '') {
      message = 'Enter mobile number';
    } else if (mail === '') {
      message = 'Enter email';
    } else if (stateData === '') {
      message = 'Select state';
    } else if (districtData === '') {
      message = 'Select district';
    } else if (password === '') {
      message = 'Enter password';
    } else if (cpassword === '') {
      message = 'Enter confirm password';
    } else if (password !== cpassword) {
      message = 'Passwards do not match';
    } else if (location === '') {
      message = 'Enter location';
    } else {
      message = '';
      //TO SUCCESS
      const response = await apiCall(
        ApiNetwork.makeuserApiCall({
          firstName: fname,
          lastName: lname,
          email: mail,
          contactNo: phone,
          address: location,
          state: stateData,
          district: districtData,
          password: password,
        }),
      );
      console.log(response);
    }
    if (message !== '') {
      Alert.alert('', message);
    }
  };

  const openSportyModal = fieldName => {
    if (fieldName === EVENT_TYPES.DISTRICT && !isValidString(stateData)) {
      return Alert.alert('Select State');
    }

    setActiveField(fieldName);
    setSportyModalVisible(true);
  };

  const onClickModalItem = data => {
    if (activeField === EVENT_TYPES.STATE) {
      setStateData(data);
      getDistrictData(data);
    } else if (activeField === EVENT_TYPES.DISTRICT) {
      setDistrictData(data);
    }
    setSportyModalVisible(false);
  };
  const getDistrictData = async data => {
    if (stateData !== data) {
      const response = await apiCall(
        ApiNetwork.makeDistrictApiCall({state: data}),
      );
      setDistrictList(response?.data);
      setDistrictData('');
    }
  };
  const flatListData = () => {
    if (activeField === EVENT_TYPES.STATE) {
      return stateDataSelector;
    } else {
      return districtList;
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <SportyInputText
        placeholder="First Name"
        leftIcon={require('../assets/images/user.png')}
        value={fname}
        onChangeText={text => setFName(text)}
      />
      <SportyInputText
        placeholder="Last Name"
        leftIcon={require('../assets/images/user.png')}
        value={lname}
        onChangeText={text => setLName(text)}
      />
      <SportyInputText
        placeholder="Mobile Number"
        leftIcon={require('../assets/images/smartphone.png')}
        keyboardType={
          Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number'
        }
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <SportyInputText
        placeholder="Email"
        leftIcon={require('../assets/images/mail.png')}
        value={mail}
        onChangeText={text => setMail(text)}
      />
      <TouchableOpacity onPress={() => openSportyModal(EVENT_TYPES.STATE)}>
        <SportyInputText
          placeholder="State"
          leftIcon={require('../assets/images/location.png')}
          editable={false}
          onPressIn={() => openSportyModal(EVENT_TYPES.STATE)}
          value={stateData}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openSportyModal(EVENT_TYPES.DISTRICT)}>
        <SportyInputText
          placeholder="District"
          leftIcon={require('../assets/images/location.png')}
          editable={false}
          onPressIn={() => openSportyModal(EVENT_TYPES.DISTRICT)}
          value={districtData}
        />
      </TouchableOpacity>
      <SportyInputText
        placeholder="Password"
        leftIcon={require('../assets/images/lock.png')}
        rightIcon={require('../assets/images/hide.png')}
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <SportyInputText
        placeholder="Confirm Password"
        leftIcon={require('../assets/images/lock.png')}
        rightIcon={require('../assets/images/hide.png')}
        secureTextEntry={true}
        value={cpassword}
        onChangeText={text => setCPassword(text)}
      />
      <SportyInputText
        placeholder="Address"
        leftIcon={require('../assets/images/location.png')}
        value={location}
        onChangeText={text => setLocation(text)}
      />
      <SportyButton onPress={onClickSignUpPress} title={'REGISTER'} />
      <SportyModal
        visible={sportyModalVisible}
        data={flatListData()}
        onPress={onClickModalItem}
        onClose={() => setSportyModalVisible(false)}
      />
    </KeyboardAwareScrollView>
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
