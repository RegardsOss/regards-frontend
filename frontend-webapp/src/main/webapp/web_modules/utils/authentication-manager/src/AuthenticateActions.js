const { CALL_API } = require('redux-api-middleware')

export const AUTHENTICATE_API = `${GATEWAY_HOSTNAME}/oauth/token`
export const REQUEST_AUTHENTICATE = 'REQUEST_AUTHENTICATE'
export const RECEIVE_AUTHENTICATE = 'RECEIVE_AUTHENTICATE'
export const FAILED_AUTHENTICATE = 'FAILED_AUTHENTICATE'

export const fetchAuthenticate = (username, password, scope = 'project1') => ({
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
            return { errorMessage: 'authentication.error.500' }
          }
          return { errorMessage: 'authentication.error' }
        },
      },

    ],
    endpoint: `${AUTHENTICATE_API}?grant_type=password&username=${username}&password=${password}&scope=${scope}`,
    method: 'POST',
  },
})

export const LOGOUT = 'LOGOUT'
export function logout() {
  return {
    type: LOGOUT,
  }
}

// alias logout for flush
export const FLUSH = LOGOUT
export const flush = logout

