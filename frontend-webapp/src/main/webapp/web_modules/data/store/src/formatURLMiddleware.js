const { CALL_API } = require('redux-api-middleware')

// Intercept actions to format valid URLs (if some parameters / path segments are not encoded)
const urlEncodingMiddleware = () => next => (action) => {
  const callAPI = action[CALL_API]
  if (callAPI) {
    callAPI.endpoint = encodeURI(callAPI.endpoint)
  }
  return next(action)
}

export default urlEncodingMiddleware
