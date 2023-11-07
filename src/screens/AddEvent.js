import React from 'react';
import {StyleSheet, ScrollView, Platform, Text} from 'react-native';
import Color from '../utils/themes/colors';
import {SportyInputText} from '../components/SprtyInput';
import SportyButton from '../components/SportyButton';

const AddEvent = () => {
  const onClickSignUpPress = () => {};

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
      <SportyInputText
        placeholder="Gender"
        leftIcon={require('../assets/images/location.png')}
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
        placeholder="Event Start"
        leftIcon={require('../assets/images/location.png')}
      />
      <SportyInputText
        placeholder="Event End"
        leftIcon={require('../assets/images/location.png')}
      />
      <SportyInputText
        placeholder="Last Date for Registration"
        leftIcon={require('../assets/images/location.png')}
      />
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
      <SportyButton onPress={onClickSignUpPress} title={'CREATE'} />
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
});

export default AddEvent;
