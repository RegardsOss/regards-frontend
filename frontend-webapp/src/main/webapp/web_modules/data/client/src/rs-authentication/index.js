/**
 * LICENSE_PLACEHOLDER
 */
import AuthenticateActions, { SPECIFIC_ENDPOINT_MARKER } from './AuthenticateActions'
import AuthenticateReducers from './AuthenticateReducers'
import AuthenticateSelectors from './AuthenticateSelectors'

/**
 * Common authentication actions.
 * SPECIFIC_ENDPOINT_MARKER is used to know the special endpoint for authentication. This endpoint is special
 * for the autentication middleware to know that this endpoint don't need a public token scope. All other endpoints are
 * avaiable without token by passing the scope in query param or into the request header.
 */
export default {
  AuthenticateActions,
  AuthenticateReducers,
  AuthenticateSelectors,
  SPECIFIC_ENDPOINT_MARKER,
}
