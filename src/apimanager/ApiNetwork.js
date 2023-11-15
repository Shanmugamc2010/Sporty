import {NETWORK_METHOD} from './ApiManager';

const {ENDPOINTS} = require('./Endpoint');

export const ApiNetwork = {
  makeLoginApiCall: params => ({
    method: NETWORK_METHOD.POST,
    url: ENDPOINTS.UserLogin,
    data: {
      username: 'sportysuperuser@sporty.com',
      password: 'Password1,',
      // username: params?.username,
      // password: params?.password,
    },
  }),
};
