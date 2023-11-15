import axios from 'axios';
import {ENDPOINTS} from './Endpoint';
import {Alert} from 'react-native';

export const NETWORK_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
};

const API = axios.create({
  baseURL: ENDPOINTS.baseUrl,
  timeout: 10000,
  headers: {},
});

// Add interceptors
API.interceptors.request.use(request => requestHandler(request));
API.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error),
);

export const apiCall = async params => {
  const response = await API.post(params.url, params.data);
  return response;
  // const response = await axiosInstance.post(api);
  // console.log(response);
};
const requestHandler = request => {
  request.baseURL = ENDPOINTS.baseUrl;
  if (__DEV__) {
    console.log('Request Data:', request.data);
    console.log('Request Headers:', request.headers);
    console.log('Request Config:', request);
  }
  //Append cancelToken to all Request header
  return request;
};
export const successHandler = response => {
  console.log('response: ', response);
  return response.data;
};
export const errorHandler = error => {
  Alert.alert('', 'Something went wrong. Please try again later');
  console.log('error:', error);
};
export default API;
