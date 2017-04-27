import { AuthenticationClient, AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'

// Redux middleware provides a third-party extension point
// between dispatching an action, and the moment it reaches the reducer
const { CALL_API } = require('redux-api-middleware')

/**
 * Returns Authorization header value, or null if no authorization possible
 * @param {*} state redux state
 * @param {*} callAPI call API for current action
 * @return Authorization header value or null
 */
const getAuthorization = (state, callAPI) => {
  if (!AuthenticationClient.authenticationSelectors.isAuthenticated(state) && callAPI.endpoint.includes(AuthenticationClient.SPECIFIC_ENDPOINT_MARKER)) {
    // for authentication only => provide client secret
    return `Basic ${btoa('client:secret')}`
  } else if (AuthenticationClient.authenticationSelectors.isAuthenticated(state)) {
    // provide known token
    const accessToken = AuthenticationClient.authenticationSelectors.getAccessToken(state)
    return `Bearer ${accessToken}`
  }
  // not authentified
  return null
}

/**
 * Builds authorization headers for current authorization state
 */
const getAuthorizationHeaders = (callStore, callAPI) => {
  const authorizationValue = getAuthorization(callStore, callAPI)
  if (authorizationValue) { // use authorization
    return { Authorization: authorizationValue }
  }
  // use public in project scope
  return { scope: AuthenticationParametersSelectors.getProject(callStore) }
}

/**
 * Builds default types headers, to be used when not overriden by the action
 */
const getDefaultTypesHeaders = (callAPI) => {
  const defaultTypeHeaders = {
    Accept: 'application/json',
  }
  // String body: json, otherwise: none (multi part form, each part specifies its type)
  if (typeof callAPI.body === 'string') {
    defaultTypeHeaders['Content-type'] = 'application/json'
  }
  return defaultTypeHeaders
}

// Intercept actions
// If the action is formated as [CALL_API]: {...}, inject the headers
const headersMiddleware = () => next => (action) => {
  const callAPI = action[CALL_API]
  if (callAPI) {
    const specificHeaders = callAPI.headers || {}
    callAPI.headers = callStore =>
      // merge the specified headers with automatically added ones
      ({
        // lower preference: locally added headers
        ...getDefaultTypesHeaders(callAPI),
        ...getAuthorizationHeaders(callStore, callAPI),
        // higher preference: action specific headers
        ...specificHeaders,
      })
  }
  return next(action)
}

export default headersMiddleware
