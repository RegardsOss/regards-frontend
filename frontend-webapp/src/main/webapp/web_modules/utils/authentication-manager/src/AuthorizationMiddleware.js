import AuthenticateActions from './AuthenticateActions'
import AuthenticationSelectors from './AuthenticateSelectors'

// Redux middleware provides a third-party extension point
// between dispatching an action, and the moment it reaches the reducer
const { CALL_API } = require('redux-api-middleware')


const getAuthorization = (state, callAPI) => {
  // Todo: Extract this value to lets the administrator deploys the frontend with another key
  // Init the authorization bearer of the fetch authentication request
  // TODO : check that thing: it supposes that the non authentified user can NEVER send a non authenticated signal
  if (!AuthenticationSelectors.isAuthenticated(state) && callAPI.types[0] === AuthenticateActions.SIGNAL_REQUEST) {
    return `Basic ${btoa('client:secret')}`
  } else if (AuthenticationSelectors.isAuthenticated(state)) {
    const authentication = AuthenticationSelectors.getAuthentication(state)
    return `Bearer ${authentication.result.access_token}`
  }
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
        // TODO: Find scope on the store
        headers.scope = ''
      }
      return headers
    }
  }

  return next(action)
}
export default putAuthorization
