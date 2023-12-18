import React from 'react';
import {FlatList, TouchableOpacity, Text, View} from 'react-native';
import {FONT_NAME} from '../utils/themes/FontName';
import Color from '../utils/themes/colors';
import {SCREEN_TYPE} from '../utils/themes/constant';
import {useDispatch} from 'react-redux';
import {LOGOUT_SUCCESS} from '../Redux/Type';
import {CommonActions} from '@react-navigation/native';

const data = ['Change password', 'Help', 'New Event', 'Logout'];

const Account = props => {
  const dispatch = useDispatch();
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handlePress(item)}
      style={{
        justifyContent: 'center',
        height: 40,
        backgroundColor: Color.White,
        padding: 8,
      }}>
      <Text
        style={{fontFamily: FONT_NAME.SEMI_BOLD, color: Color.PinkishPurple}}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const handlePress = item => {
    // Handle press based on the selected item
    switch (item) {
      case 'Change password':
        // Handle Change password action
        break;
      case 'Help':
        // Handle Help action
        break;
      case 'New Event':
        props.navigation.navigate(SCREEN_TYPE.ADD_EVENTS.name);
        break;
      case 'Logout':
        dispatch({type: LOGOUT_SUCCESS});
        props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: SCREEN_TYPE.LOG_IN.name}],
          }),
        );
        setTimeout(() => {
          props.navigation.navigate(SCREEN_TYPE.LOG_IN.name);
        }, 1000);

        break;
      default:
        break;
    }
  };

  return (
    <View>
      <FlatList
        style={{
          margin: 5,
          borderColor: Color.DeepRose,
          borderWidth: 0.5,
          borderRadius: 8,
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </View>
  );
};

export default Account;
