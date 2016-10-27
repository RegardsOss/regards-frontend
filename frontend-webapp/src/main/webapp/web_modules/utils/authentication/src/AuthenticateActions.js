const { CALL_API } = require('redux-api-middleware');

export const AUTHENTICATE_API = 'http://localhost:8080/oauth/token';
export const REQUEST_AUTHENTICATE = 'REQUEST_AUTHENTICATE';
export const RECEIVE_AUTHENTICATE = 'RECEIVE_AUTHENTICATE';
export const FAILED_AUTHENTICATE = 'FAILED_AUTHENTICATE';

export const fetchAuthenticate = (username, password) => ({
  [CALL_API]: {
    types: [
      REQUEST_AUTHENTICATE,
      {
        type: RECEIVE_AUTHENTICATE,
        meta: { authenticateDate: Date.now(), name },
      },
      {
        type: FAILED_AUTHENTICATE,
        meta: (action, state, res) => {
          if (res.status === '500') {
            return { errorMessage: 'authentication.error.500' };
          } else {
            return { errorMessage: 'authentication.error' };
          }
        },
      },

    ],
    endpoint: `${AUTHENTICATE_API}?grant_type=password&username=${username}&password=${password}`,
    method: 'POST',
  },
});

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT,
  };
}
