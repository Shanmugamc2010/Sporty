import {
  REQUEST_API_DATA,
  LOGIN_API_SUCCESS,
  STOP_LOADER,
  SET_INITIAL_APP_OPEN,
  SET_STATE_DISTRICT_DATA,
  LOGOUT_SUCCESS,
} from './Type';

const initialState = {
  isLoading: false,
  loginData: null,
  isFirstTimeAppOpen: true,
  stateData: null,
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_API_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_API_SUCCESS:
      return {
        ...state,
        loginData: action.payload,
      };
    case STOP_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    case SET_INITIAL_APP_OPEN:
      return {
        ...state,
        isFirstTimeAppOpen: false,
      };
    case SET_STATE_DISTRICT_DATA:
      return {
        ...state,
        stateData: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loginData: null,
      };
    default:
      return state;
  }
};
