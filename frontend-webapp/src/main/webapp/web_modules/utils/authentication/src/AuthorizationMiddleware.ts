const {CALL_API} = require('redux-api-middleware')
import { REQUEST_AUTHENTICATE } from "./AuthenticateActions"

// Redux middleware provides a third-party extension point
// between dispatching an action, and the moment it reaches the reducer


const getAuthorization = (state: any, callAPI: any) => {
  // Init the authorization bearer of the fetch request
  const authentication = state.common.authentication
  // let authorization = "Basic "
  // Todo: Extract this value to lets the administrator deploys the frontend with another key
  let authorization = "Basic " + btoa("acme:acmesecret")
  if (authentication && authentication.user && authentication.user.access_token && callAPI.types[0] !== REQUEST_AUTHENTICATE) {
    authorization = "Bearer " + authentication.user.access_token
  }

  return authorization
}

// Intercept actions
// If the action is formated as [CALL_API]: {...}, inject the headers
export default (store: any) => (next: any) => (action: any) => {
  let callAPI = action[CALL_API]
  if (callAPI) {
    callAPI.headers = (callStore: any) => ({
      'Accept': 'application/json',
      'Content-type': 'application/json',
      'Authorization': getAuthorization(callStore, callAPI) || ''
    })
  }

  return next(action)
}
