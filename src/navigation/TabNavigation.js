import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Color from '../utils/themes/colors';
import {SCREEN_TYPE} from '../utils/themes/constant';
import MyEvents from '../screens/MyEvents';
import AllEvents from '../screens/AllEvents';
import Account from '../screens/Account';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FONT_NAME} from '../utils/themes/FontName';
import {StyleSheet} from 'react-native';
const Tab = createBottomTabNavigator();

const TabScreenOptions = props => {
  return {
    tabBarActiveTintColor: Color.PinkishPurple,
    tabBarInactiveTintColor: Color.MoodyBlue,
    tabBarIcon: tabProps => renderTabIcon(props, tabProps),
    headerTitleAlign: 'left',
    tabBarStyle: {...styles.tabStyle},
    tabBarLabelStyle: styles.tabBarLabel,
    headerTitleStyle: {fontSize: 18, color: Color.PinkishPurple},
  };
};

const renderTabIcon = (props, tabProps) => {
  const {focused, color} = tabProps;
  const {route} = props;
  const data = getRouteData(route?.name, focused);
  return <MaterialIcons name={data.icon} color={color} size={28} />;
};

const getRouteData = (routeName, focused) => {
  let data = {icon: null};
  switch (routeName) {
    case SCREEN_TYPE.ALL_EVENTS.name:
      data.icon = focused ? FONT_NAME.EVENT : FONT_NAME.EVENT;
      data.tabName = SCREEN_TYPE.ALL_EVENTS.title;
      break;
    case SCREEN_TYPE.MY_EVENTS.name:
      data.icon = focused ? FONT_NAME.EVENT : FONT_NAME.EVENT;
      break;
    case SCREEN_TYPE.ACCOUNT.name:
      data.icon = focused ? FONT_NAME.PERSON_FILL : FONT_NAME.PERSON_UNFILL;
      break;
  }
  return data;
};

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen name={SCREEN_TYPE.MY_EVENTS.name} component={MyEvents} />
      <Tab.Screen name={SCREEN_TYPE.ALL_EVENTS.name} component={AllEvents} />
      <Tab.Screen name={SCREEN_TYPE.ACCOUNT.name} component={Account} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabStyle: {
    zIndex: 4,
    backgroundColor: Color.White,
    shadowColor: Color.grey,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    elevation: 5,
    shadowOpacity: 0.6,
    paddingVertical: 10,
  },
  tabBarLabel: {
    fontSize: 11,
    fontFamily: FONT_NAME.SEMI_BOLD,
  },
});

export default TabNavigation;
