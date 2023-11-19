import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Platform,
  Text,
  TouchableOpacity,
  Alert,
  View,
  Image,
} from 'react-native';
import Color from '../utils/themes/colors';
import {SportyInputText} from '../components/SprtyInput';
import SportyButton from '../components/SportyButton';
import DateTimePicker from '../components/DateTimePicker';
import moment from 'moment';
import {EVENT_TYPES} from '../utils/themes/constant';
import {
  isAfterOrEqualDate,
  isBeforeOrEqualDate,
  isValidString,
} from '../utils/helper';
import {FONT_NAME} from '../utils/themes/FontName';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FileUploadModal from '../components/FileUploadModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SportyModal from '../components/SportyModal';
import {useSelector} from 'react-redux';
import {getStateData} from '../Redux/Selector';
import {apiCall} from '../apimanager/ApiManager';
import {ApiNetwork} from '../apimanager/ApiNetwork';

const AddEvent = () => {
  const stateDataSelector = useSelector(state => getStateData(state));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventStart, setEventStart] = useState({date: '', displayDate: ''});
  const [eventEnd, setEventEnd] = useState({date: '', displayDate: ''});
  const [modalVisible, setModalVisible] = useState(false);
  const [sportyModalVisible, setSportyModalVisible] = useState(false);
  const [registrationEnd, setRegistrationEnd] = useState({
    date: '',
    displayDate: '',
  });
  const [activeField, setActiveField] = useState('');
  const [genderData, setGenderData] = useState('');
  const [stateData, setStateData] = useState('');
  const [districtList, setDistrictList] = useState([]);
  const [districtData, setDistrictData] = useState('');
  const [selectedImages, setSelectedImages] = useState([
    {
      name: require('/Users/dev/Sporty/src/assets/images/Logo.png'),
    },
    {
      name: require('/Users/dev/Sporty/src/assets/images/Logo.png'),
    },
    {
      name: require('/Users/dev/Sporty/src/assets/images/Logo.png'),
    },
    {
      name: require('/Users/dev/Sporty/src/assets/images/Logo.png'),
    },
  ]);
  const gender = ['MALE', 'FEMALE', 'OTHERS'];
  const flatListData = () => {
    if (activeField === EVENT_TYPES.GENDER) {
      return gender;
    } else if (activeField === EVENT_TYPES.STATE) {
      return stateDataSelector;
    } else if (activeField === EVENT_TYPES.DISTRICT) {
      return districtList;
    }
    return [];
  };

  const openSportyModal = fieldName => {
    setActiveField(fieldName);
    setSportyModalVisible(true);
  };

  const onClickModalItem = data => {
    if (activeField === EVENT_TYPES.GENDER) {
      setGenderData(data);
    } else if (activeField === EVENT_TYPES.STATE) {
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

  const handleFilePickerModalClose = () => {
    setModalVisible(false);
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

  const onSelect = date => {
    if (activeField === EVENT_TYPES.EVENT_START) {
      const isDateBeforeOrEqualToEndDate = isValidString(eventEnd.date)
        ? isBeforeOrEqualDate(date, eventEnd.date)
        : true;
      const isDateAfterOrEqualToRegisterDate = isValidString(
        registrationEnd.date,
      )
        ? isAfterOrEqualDate(date, registrationEnd.date)
        : true;
      if (isDateBeforeOrEqualToEndDate && isDateAfterOrEqualToRegisterDate) {
        setEventStart({date: date, displayDate: formatDate(date)});
      } else {
        Alert.alert(
          'The start date should be less than or equal to end and register Date',
        );
      }
    } else if (activeField === EVENT_TYPES.EVENT_END) {
      const isDateAfterOrEqualToStartDate = isValidString(eventStart.date)
        ? isAfterOrEqualDate(date, eventStart.date)
        : true;
      const isDateAfterOrEqualToRegisterDate = isValidString(
        registrationEnd.date,
      )
        ? isAfterOrEqualDate(date, registrationEnd.date)
        : true;
      if (isDateAfterOrEqualToStartDate && isDateAfterOrEqualToRegisterDate) {
        setEventEnd({date: date, displayDate: formatDate(date)});
      } else {
        Alert.alert(
          'The End date should be greater than or equal to start and register Date',
        );
      }
    } else if (activeField === EVENT_TYPES.REGISTRATION_END) {
      const isDateBeforeOrEqualToStartDate = isValidString(eventStart.date)
        ? isBeforeOrEqualDate(date, eventStart.date)
        : true;
      const isDateBeforeOrEqualToEndDate = isValidString(eventEnd.date)
        ? isBeforeOrEqualDate(date, eventEnd.date)
        : true;
      if (isDateBeforeOrEqualToStartDate && isDateBeforeOrEqualToEndDate) {
        setRegistrationEnd({date: date, displayDate: formatDate(date)});
      } else {
        Alert.alert('The Register date should be less than start and end Date');
      }
    }
    setShowDatePicker(false);
  };
  const onCancel = () => {
    setShowDatePicker(false);
  };

  const formatDate = date => {
    const formattedDate = new Date(date);
    return moment(formattedDate).format('D/M/YY H:mm A');
  };

  const openDatePicker = useCallback(
    eventType => {
      setShowDatePicker(true);
      setActiveField(eventType);
    },
    [setShowDatePicker, setActiveField],
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleStyle}>Enter Tournament Details</Text>
      <SportyInputText
        placeholder="Tournament Title"
        leftIcon={require('../assets/images/user.png')}
      />
      <SportyInputText
        placeholder="Conducted By"
        leftIcon={require('../assets/images/user.png')}
      />
      <SportyInputText
        placeholder="Venue"
        leftIcon={require('../assets/images/location.png')}
      />
      <SportyInputText
        placeholder="Game Type"
        leftIcon={require('../assets/images/mail.png')}
      />
      <TouchableOpacity onPress={() => openSportyModal(EVENT_TYPES.GENDER)}>
        <SportyInputText
          editable={false}
          placeholder="Gender"
          leftIcon={require('../assets/images/location.png')}
          onPressIn={() => openSportyModal(EVENT_TYPES.GENDER)}
          value={genderData}
        />
      </TouchableOpacity>
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
      <TouchableOpacity onPress={() => openDatePicker(EVENT_TYPES.EVENT_START)}>
        <SportyInputText
          placeholder="Event Start (d/M/yy h:mm)"
          value={eventStart.displayDate}
          leftIcon={require('../assets/images/location.png')}
          onPressIn={() => openDatePicker(EVENT_TYPES.EVENT_START)}
          editable={false}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openDatePicker(EVENT_TYPES.EVENT_END)}>
        <SportyInputText
          placeholder="Event End (d/M/yy h:mm)"
          leftIcon={require('../assets/images/location.png')}
          value={eventEnd.displayDate}
          onPressIn={() => openDatePicker(EVENT_TYPES.EVENT_END)}
          editable={false}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => openDatePicker(EVENT_TYPES.REGISTRATION_END)}>
        <SportyInputText
          placeholder="Last Date For Registration (d/M/yy h:mm)"
          leftIcon={require('../assets/images/location.png')}
          value={registrationEnd.displayDate}
          onPressIn={() => openDatePicker(EVENT_TYPES.REGISTRATION_END)}
          editable={false}
        />
      </TouchableOpacity>
      <SportyInputText
        placeholder="Registration Link"
        leftIcon={require('../assets/images/location.png')}
      />
      <SportyInputText
        placeholder="Contact Email"
        leftIcon={require('../assets/images/mail.png')}
      />
      <SportyInputText
        placeholder="Contact Email"
        leftIcon={require('../assets/images/mail.png')}
      />
      <SportyInputText
        placeholder="Contact Number 1"
        leftIcon={require('../assets/images/smartphone.png')}
        keyboardType={
          Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number'
        }
      />
      <SportyInputText
        placeholder="Contact Number 2"
        leftIcon={require('../assets/images/smartphone.png')}
        keyboardType={
          Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number'
        }
      />
      <SportyInputText
        placeholder="Price Money"
        leftIcon={require('../assets/images/mail.png')}
      />
      <SportyInputText
        placeholder="Price Details"
        leftIcon={require('../assets/images/mail.png')}
      />
      <SportyInputText
        placeholder="Game Rules"
        leftIcon={require('../assets/images/mail.png')}
      />
      <View style={styles.docUploadContainer}>
        <Text style={styles.docUploadHeaderStyle}>Upload Document</Text>
        <ScrollView horizontal={true}>
          {selectedImages.map((image, index) => (
            <View key={index} style={styles.docImageContainerStyle}>
              <Image source={image.name} style={styles.docImageStyle} />

              <TouchableOpacity
                onPress={() => {
                  const updatedImages = [...selectedImages];
                  updatedImages.splice(index, 1);
                  setSelectedImages(updatedImages);
                }}>
                <MaterialIcons name={FONT_NAME.CANCEL} size={15} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.uploadButtonStyle}
          onPress={() => {
            handleUploadPress();
          }}>
          <Text style={styles.uploadTextStyle}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
      <SportyButton onPress={() => {}} title={'CREATE'} />
      {showDatePicker ? (
        <DateTimePicker onSelect={onSelect} onCancel={onCancel} />
      ) : null}
      <FileUploadModal
        visible={modalVisible}
        onClose={handleFilePickerModalClose}
        onCameraPress={handleCameraPress}
        onFilePress={handleFilePress}
      />
      <SportyModal
        visible={sportyModalVisible}
        data={flatListData()}
        onPress={onClickModalItem}
        onClose={() => setSportyModalVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    padding: 10,
  },
  titleStyle: {
    color: Color.MoodyBlue,
    padding: 10,
    fontSize: 15,
    fontWeight: '600',
  },
  docUploadContainer: {
    flex: 1,
    margin: 10,
    borderWidth: 0.5,
    borderColor: Color.MoodyBlue,
    borderRadius: 10,
  },
  docUploadHeaderStyle: {
    fontFamily: FONT_NAME.SEMI_BOLD,
    color: Color.MoodyBlue,
    margin: 5,
  },
  docImageContainerStyle: {
    marginHorizontal: 5,
    flexDirection: 'row',
    marginVertical: 5,
  },
  docImageStyle: {height: 60, width: 60},
  uploadButtonStyle: {
    margin: 10,
    backgroundColor: Color.PinkishPurple,
    width: '25%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  uploadTextStyle: {
    margin: 10,
    alignSelf: 'center',
    color: Color.White,
    fontFamily: FONT_NAME.SEMI_BOLD,
  },
});

export default AddEvent;
