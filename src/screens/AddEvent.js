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
import {
  EVENT_TYPES,
  GAME_TYPE,
  GENDER,
  SCREEN_TYPE,
  gender,
} from '../utils/themes/constant';
import {
  isAfterOrEqualDate,
  isBeforeOrEqualDate,
  isValidString,
  formatDate,
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
import {CommonActions} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddEvent = props => {
  const isUpdateTournament = props?.route?.params?.isUpdateTournament;
  const eventDetails = props?.route?.params?.eventDetails;
  const stateDataSelector = useSelector(state => getStateData(state));
  const [title, setTitle] = useState(eventDetails?.tournamentTitle || '');
  const [conductedBy, setConductedBy] = useState(
    eventDetails?.conductedBy || '',
  );
  const [venue, setVenue] = useState(eventDetails?.venue || '');
  const [gameType, setGameType] = useState({
    gameType:
      Object.values(GAME_TYPE)[eventDetails?.gameTypeId?.toString()] || '',
    gameTypeId: eventDetails?.gameTypeId || '',
  });

  const [registerLink, setRegisterLink] = useState(
    eventDetails?.registrationUrl || '',
  );
  const [email, setEmail] = useState(eventDetails?.contactEmail || '');
  const [contact1, setContact1] = useState(eventDetails?.contactNumber1 || '');
  const [contact2, setContact2] = useState(eventDetails?.contactNumber2 || '');
  const [prizeMoney, setPrizeMoney] = useState(
    eventDetails?.totalPrizeMoney?.toString() || '',
  );
  const [prizeDetails, setPrizeDetails] = useState(
    eventDetails?.prizeDetails || '',
  );
  const [rules, setRules] = useState(eventDetails?.rulesandRegulation || '');

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [eventStart, setEventStart] = useState({
    date: eventDetails?.startDate || '',
    displayDate: eventDetails?.startDate
      ? formatDate(eventDetails?.startDate)
      : '',
  });
  const [eventEnd, setEventEnd] = useState({
    date: eventDetails?.endDate || '',
    displayDate: eventDetails?.endDate ? formatDate(eventDetails?.endDate) : '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [sportyModalVisible, setSportyModalVisible] = useState(false);
  const [registrationEnd, setRegistrationEnd] = useState({
    date: eventDetails?.lastDateForRegistration || '',
    displayDate: eventDetails?.lastDateForRegistration
      ? formatDate(eventDetails?.lastDateForRegistration)
      : '',
  });
  const [activeField, setActiveField] = useState('');
  const [genderData, setGenderData] = useState(eventDetails?.gender || '');
  const [stateData, setStateData] = useState(eventDetails?.state || '');
  const [districtList, setDistrictList] = useState([]);
  const [districtData, setDistrictData] = useState(
    eventDetails?.district || '',
  );
  const [selectedImages, setSelectedImages] = useState([]);

  const makeAddEventCall = async () => {
    const uploadedDocuments = selectedImages.reduce((acc, image, index) => {
      const dynamicKey = `uploadedDocument${index + 1}`;
      const result = {
        ...acc,
        [dynamicKey]: image.base64,
      };

      return result;
    }, {});
    const params = {
      tournamentTitle: title,
      venue,
      gameType: parseInt(gameType.gameTypeId, 10),
      gender: genderData,
      state: stateData,
      district: districtData,
      startDate: eventStart.date.toISOString(),
      endDate: eventEnd.date.toISOString(),
      registrationUrl: registerLink,
      lastDateForRegistration: registrationEnd.date.toISOString(),
      contactEmail: email,
      contactNumber1: contact1,
      contactNumber2: contact2,
      rulesandRegulation: rules,
      prizeDetails,
      totalPrizeMoney: parseInt(prizeMoney, 10),
      // winnerPrizeAmount: 0,
      // runnerPrizeAmount: 0,
      // secondRunnerPrizeAmount: 0,
      uploadedDocument1: '',
      conductedBy,
      ...uploadedDocuments,
    };
    const response = isUpdateTournament
      ? await apiCall(ApiNetwork.makeUpdateTournamentApiCall(params))
      : await apiCall(ApiNetwork.makeAddTournamentApiCall(params));
    if (response?.message === 'Successfully Created') {
      console.log('called===>');
      props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: SCREEN_TYPE.TAB_NAVIGATOR.name}],
        }),
      );
    }
  };
  const flatListData = () => {
    if (activeField === EVENT_TYPES.GENDER) {
      return GENDER;
    } else if (activeField === EVENT_TYPES.STATE) {
      return stateDataSelector;
    } else if (activeField === EVENT_TYPES.DISTRICT) {
      return districtList;
    } else if (activeField === EVENT_TYPES.GAMETYPE) {
      return Object.values(GAME_TYPE);
    }
    return [];
  };

  const openSportyModal = fieldName => {
    if (fieldName === EVENT_TYPES.DISTRICT && !isValidString(stateData)) {
      return Alert.alert('Select State');
    }

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
    } else if (activeField === EVENT_TYPES.GAMETYPE) {
      setGameType({
        gameType: data,
        gameTypeId: Object.values(GAME_TYPE).indexOf(data) + 1,
      });
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
    });
  };

  const handleFilePickerModalClose = () => {
    setModalVisible(false);
  };

  const handleFilePress = () => {
    launchImageLibrary({includeBase64: true}, async response => {
      if (response.error) {
        Alert.alert('Error', 'Failed to open file picker');
      } else {
        if (!response?.didCancel) {
          // setSelectedImages(prev => [
          //   ...prev,
          //   {uri: response.assets[0]?.uri, base64: response.assets[0]?.base64},
          // ]);
        }
        setModalVisible(false);
      }
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

  const openDatePicker = useCallback(
    eventType => {
      setShowDatePicker(true);
      setActiveField(eventType);
    },
    [setShowDatePicker, setActiveField],
  );

  const renderImageUpload = () => {
    const showUploadButton = selectedImages.length < 3;
    return (
      <View style={styles.docUploadContainer}>
        <Text style={styles.docUploadHeaderStyle}>
          {'Upload Document\t(Max: 3)'}
        </Text>
        <View style={styles.imageViewStyle}>
          {selectedImages.map((data, index) => (
            <View key={index} style={styles.docImageContainerStyle}>
              <Image
                source={{uri: `data:image/jpg;base64,${data.base64}`}}
                style={styles.docImageStyle}
              />

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
        </View>
        {showUploadButton ? (
          <TouchableOpacity
            style={styles.uploadButtonStyle}
            onPress={() => {
              handleUploadPress();
            }}>
            <Text style={styles.uploadTextStyle}>UPLOAD</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Text style={styles.titleStyle}>Enter Tournament Details</Text>
      <SportyInputText
        placeholder="Tournament Title"
        leftIcon={require('../assets/images/user.png')}
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <SportyInputText
        placeholder="Conducted By"
        leftIcon={require('../assets/images/user.png')}
        value={conductedBy}
        onChangeText={text => setConductedBy(text)}
      />
      <SportyInputText
        placeholder="Venue"
        leftIcon={require('../assets/images/location.png')}
        value={venue}
        onChangeText={text => setVenue(text)}
      />
      <TouchableOpacity onPress={() => openSportyModal(EVENT_TYPES.GAMETYPE)}>
        <SportyInputText
          editable={false}
          placeholder="Game Type"
          leftIcon={require('../assets/images/mail.png')}
          value={gameType.gameType}
          onPressIn={() => openSportyModal(EVENT_TYPES.GAMETYPE)}
        />
      </TouchableOpacity>
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
        value={registerLink}
        onChangeText={text => setRegisterLink(text)}
        autoCapitalize="none"
      />
      <SportyInputText
        placeholder="Contact Email"
        leftIcon={require('../assets/images/mail.png')}
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
      />
      <SportyInputText
        placeholder="Contact Number 1"
        leftIcon={require('../assets/images/smartphone.png')}
        keyboardType={
          Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number'
        }
        value={contact1}
        onChangeText={text => setContact1(text)}
      />
      <SportyInputText
        placeholder="Contact Number 2"
        leftIcon={require('../assets/images/smartphone.png')}
        keyboardType={
          Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'number'
        }
        value={contact2}
        onChangeText={text => setContact2(text)}
      />
      <SportyInputText
        placeholder="Price Money"
        leftIcon={require('../assets/images/mail.png')}
        value={prizeMoney}
        onChangeText={text => setPrizeMoney(text)}
      />
      <SportyInputText
        placeholder="Price Details"
        leftIcon={require('../assets/images/mail.png')}
        value={prizeDetails}
        onChangeText={text => setPrizeDetails(text)}
      />
      <SportyInputText
        placeholder="Game Rules"
        leftIcon={require('../assets/images/mail.png')}
        value={rules}
        onChangeText={text => setRules(text)}
      />
      {renderImageUpload()}
      <SportyButton
        onPress={makeAddEventCall}
        title={isUpdateTournament ? 'UPDATE' : 'CREATE'}
      />
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
    </KeyboardAwareScrollView>
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
  scrollViewStyle: {
    justifyContent: 'center',
  },
  imageViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default AddEvent;
