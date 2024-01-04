import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import AppBar from '../components/AppHeader';
import ForgotPassword from '../screens/ForgotPassword';
import {SCREEN_TYPE} from '../utils/themes/constant';
import TabNavigation from './TabNavigation';
import {useSelector} from 'react-redux';
import {getLoginData} from '../Redux/Selector';
import Dashboard from '../screens/Dashboard';
import AddEvent from '../screens/AddEvent';
import DashboardFilter from '../screens/DashboardFilter';
import EventDetail from '../screens/EventDetail';
import ResetPassword from '../screens/ResetPassword';

const Stack = createNativeStackNavigator();
const hideHeader = {headerShown: false};

const AuthStack = () => {
  return (
    <>
      <Stack.Screen
        name={SCREEN_TYPE.LOG_IN.name}
        component={Login}
        options={{...hideHeader}}
      />
      <Stack.Screen
        name={SCREEN_TYPE.REGISTER.name}
        component={Register}
        options={{headerTitle: SCREEN_TYPE.REGISTER.title}}
      />
      <Stack.Screen
        name={SCREEN_TYPE.FORGOT_PASSWORD.name}
        component={ForgotPassword}
        options={{headerTitle: SCREEN_TYPE.FORGOT_PASSWORD.title}}
      />
    </>
  );
};

const MyStack = () => {
  const loginData = useSelector(state => getLoginData(state));
  return (
    <Stack.Navigator screenOptions={{header: props => <AppBar {...props} />}}>
      {!loginData ? AuthStack() : null}
      <Stack.Screen
        name={SCREEN_TYPE.TAB_NAVIGATOR.name}
        component={TabNavigation}
        options={{...hideHeader}}
      />
      <Stack.Screen
        name={SCREEN_TYPE.DASHBOARD.name}
        component={Dashboard}
        options={{headerTitle: SCREEN_TYPE.DASHBOARD.title}}
      />
      <Stack.Screen
        name={SCREEN_TYPE.ADD_EVENTS.name}
        component={AddEvent}
        options={{headerTitle: SCREEN_TYPE.ADD_EVENTS.title}}
      />
      <Stack.Screen
        name={SCREEN_TYPE.EVENT_DETAIL.name}
        component={EventDetail}
        options={{headerTitle: SCREEN_TYPE.EVENT_DETAIL.title}}
      />
      <Stack.Screen
        name={SCREEN_TYPE.RESET_PASSWORD.name}
        component={ResetPassword}
        options={{headerTitle: SCREEN_TYPE.RESET_PASSWORD.title}}
      />
      <Stack.Group
        screenOptions={{
          headerShown: false,
          presentation: 'transparentModal',
        }}>
        <Stack.Screen
          name={SCREEN_TYPE.DASHBOARD_FILTER.name}
          component={DashboardFilter}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export const RootStack = () => {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};
