import {NETWORK_METHOD} from './ApiManager';

const {ENDPOINTS} = require('./Endpoint');

export const ApiNetwork = {
  makeLoginApiCall: params => ({
    method: NETWORK_METHOD.POST,
    url: ENDPOINTS.UserLogin,
    data: {
      username: 'sportysuperuser@sporty.com',
      password: 'Password1,',
      //   username: params?.email,
      //   password: params?.password,
    },
  }),
  makeuserApiCall: params => ({
    method: NETWORK_METHOD.POST,
    url: ENDPOINTS.User,
    data: {
      registrationFor: '0',
      organisationName: '',
      organisationType: '',
      firstName: params?.firstName,
      lastName: params?.lastName,
      email: params?.email,
      contactNo: params?.contactNo,
      address: params?.address,
      state: params?.state,
      district: params?.district,
      password: params?.password,
    },
  }),
  makeStateApiCall: params => ({
    method: NETWORK_METHOD.GET,
    url: ENDPOINTS.State,
    data: {},
  }),
  makeDistrictApiCall: params => ({
    method: NETWORK_METHOD.GET,
    url: `${ENDPOINTS.District}?state=${params.state}`,
    data: {},
  }),
  makeAddTournamentApiCall: params => ({
    method: NETWORK_METHOD.POST,
    url: ENDPOINTS.AddTournament,
    data: {...params},
  }),
  makeUpdateTournamentApiCall: params => ({
    method: NETWORK_METHOD.POST,
    url: `${ENDPOINTS.UpdateTournament}?id=${params.tournamentId}`,
    data: {...params},
  }),
  getTournamentsApiCall: params => ({
    method: NETWORK_METHOD.GET,
    url: `${ENDPOINTS.GetTournaments}?pageNo=1&rowsPerPage=1000&Status=1`,
  }),

  getTournamentApiCall: params => ({
    method: NETWORK_METHOD.GET,
    url: `${ENDPOINTS.GetTournament}?id=${params.tournamentId}`,
  }),
  removeTournamentApiCall: params => ({
    method: NETWORK_METHOD.DELETE,
    url: `${ENDPOINTS.RemoveTournament}?id=${params.tournamentId}`,
  }),
  resetPasswordApiCall: params => {
    console.log(params);
    return {
      method: NETWORK_METHOD.POST,
      url: ENDPOINTS.RemoveTournament,
      data: params,
    };
  },
};
