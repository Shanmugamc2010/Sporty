import {CommonActions} from '@react-navigation/native';
import {ApiNetwork} from '../apimanager/ApiNetwork';
import {
  REQUEST_API_DATA,
  LOGIN_API_SUCCESS,
  SET_INITIAL_APP_OPEN,
  SET_STATE_DISTRICT_DATA,
  STOP_LOADER,
} from './Type';
import {SCREEN_TYPE} from '../utils/themes/constant';
import {apiCall} from '../apimanager/ApiManager';

export const requestApiAction = () => ({
  type: REQUEST_API_DATA,
});

export const loginApiSuccess = data => ({
  type: LOGIN_API_SUCCESS,
  payload: data,
});

export const stopLoader = () => {
  return {
    type: STOP_LOADER,
  };
};

export const setInitialAppOpen = () => {
  return {
    type: SET_INITIAL_APP_OPEN,
  };
};

export const setStateDistrictData = data => {
  return {
    type: SET_STATE_DISTRICT_DATA,
    payload: data,
  };
};

export const makeLoginCall =
  (email, password, navigation) => async dispatch => {
    try {
      dispatch(requestApiAction());
      const response = await apiCall(
        ApiNetwork.makeLoginApiCall({email, password}),
      );
      dispatch(loginApiSuccess(response));
      if (response?.token) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: SCREEN_TYPE.TAB_NAVIGATOR.name}],
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
