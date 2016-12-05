const { CALL_API } = require('redux-api-middleware')

export const ENDPOINTS_API = `${GATEWAY_HOSTNAME}/api/endpoints`
export const ENDPOINTS_REQUEST = 'ENDPOINTS_REQUEST'
export const ENDPOINTS_SUCCESS = 'ENDPOINTS_SUCCESS'
export const ENDPOINTS_FAILURE = 'ENDPOINTS_FAILURE'

// Fetches root endpoints
export const fetchEndpoints = () => ({
  [CALL_API]: {
    types: [
      ENDPOINTS_REQUEST,
      ENDPOINTS_SUCCESS,
      ENDPOINTS_FAILURE,
    ],
    endpoint: ENDPOINTS_API,
    method: 'GET',
  },
})
