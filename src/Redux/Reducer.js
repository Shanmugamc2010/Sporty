import {REQUEST_API_DATA, LOGIN_API_SUCCESS, REQUEST_API_FAILURE} from './Type';

const initialState = {
  isLoading: false,
  loginData: null,
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
    case REQUEST_API_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
