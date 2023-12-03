import {Platform} from 'react-native';

export const IsIOS = Platform.OS === 'ios';

export const SCREEN_TYPE = {
  LOG_IN: {
    name: 'LogIn',
  },
  REGISTER: {
    name: 'Register',
    title: 'Log In',
  },
  FORGOT_PASSWORD: {
    name: 'ForgotPassword',
    title: 'Log In',
  },
  DASHBOARD: {
    name: 'Dashboard',
    title: 'Events',
  },
  DASHBOARD_FILTER: {
    name: 'Dashboard_Filter',
    title: '',
  },
  ADD_EVENTS: {
    name: 'Add_Events',
    title: 'Dashboard',
  },
  TAB_NAVIGATOR: {
    name: 'Tab_Navigator',
    title: '',
  },
  MY_EVENTS: {
    name: 'My Events',
    title: 'My Events',
  },
  ALL_EVENTS: {
    name: 'All Events',
    title: 'All Events',
  },
  ACCOUNT: {
    name: 'My Account',
    title: 'My Account',
  },
  EVENT_DETAIL: {
    name: 'Events',
    title: 'Events',
  },
};

export const EVENT_TYPES = {
  EVENT_START: 'eventStart',
  EVENT_END: 'eventEnd',
  REGISTRATION_END: 'registrationEnd',
  GENDER: 'gender',
  STATE: 'state',
  DISTRICT: 'district',
};
