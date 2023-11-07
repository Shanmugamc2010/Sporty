import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import AppBar from '../components/AppHeader';
import ForgotPassword from '../screens/ForgotPassword';
import {SCREEN_TYPE} from '../utils/themes/constant';
import Dashboard from '../screens/Dashboard';
import DashboardFilter from '../screens/DashboardFilter';
import AddEvent from '../screens/AddEvent';

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  const MyStack = (
    // eslint-disable-next-line react/no-unstable-nested-components
    <Stack.Navigator screenOptions={{header: props => <AppBar {...props} />}}>
      <Stack.Screen
        name={SCREEN_TYPE.LOG_IN.name}
        component={Login}
        options={{headerShown: false}}
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
      {/* <Stack.Screen name={'DRAWER'} component={MyDrawer} options={''} /> */}
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
  return <NavigationContainer>{MyStack}</NavigationContainer>;
};
