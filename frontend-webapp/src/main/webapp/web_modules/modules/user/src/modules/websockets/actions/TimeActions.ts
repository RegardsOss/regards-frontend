const {CALL_API} = require('redux-api-middleware')

export const START_TIME_API = 'http://localhost:8080/api/time/start'
export const START_TIME_REQUEST = 'START_TIME_REQUEST'
export const START_TIME_SUCCESS = 'START_TIME_SUCCESS'
export const START_TIME_FAILURE = 'START_TIME__FAILURE'

// Fetches all project admins
// Relies on the custom API middleware defined in redux-api-middleware
// Normalize the json response
export const startTimeWebSocket = () => ({
  [CALL_API]: {
    // endpointKey : key,
    // links: dataObject.links,
    types: [
      START_TIME_REQUEST,
      {
        type: START_TIME_SUCCESS,
      },
      START_TIME_FAILURE
    ],
    endpoint: START_TIME_API,
    method: 'GET'
  }
})
