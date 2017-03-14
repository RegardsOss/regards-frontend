import { AuthenticateActions } from './AuthenticateActions'
import AuthenticationParametersSelectors from './AuthenticationParametersSelectors'
import AuthenticationSelectors from './AuthenticateSelectors'

// Redux middleware provides a third-party extension point
// between dispatching an action, and the moment it reaches the reducer
const { CALL_API } = require('redux-api-middleware')


const getAuthorization = (state, callAPI) => {
  if (!AuthenticationSelectors.isAuthenticated(state) && callAPI.endpoint.includes(AuthenticateActions.SPECIFIC_ENDPOINT_MARKER)) {
    // for authentication only => provide client secret
    return `Basic ${btoa('client:secret')}`
  } else if (AuthenticationSelectors.isAuthenticated(state)) {
    // provide known token
    const authentication = AuthenticationSelectors.getAuthentication(state)
    return `Bearer ${authentication.result.access_token}`
  }
  // not authentified
  return ''
}

// Intercept actions
// If the action is formated as [CALL_API]: {...}, inject the headers
const putAuthorization = () => next => (action) => {
  const callAPI = action[CALL_API]
  if (callAPI) {
    callAPI.headers = (callStore) => {
      const headers = {
        Accept: 'application/json',
        'Content-type': 'application/json',
      }
      const auth = getAuthorization(callStore, callAPI)
      if (auth.length) {
        headers.Authorization = auth
      } else {
        headers.scope = AuthenticationParametersSelectors.getProject(callStore)
      }
      return headers
    }
  }

  return next(action)
}
export default putAuthorization
