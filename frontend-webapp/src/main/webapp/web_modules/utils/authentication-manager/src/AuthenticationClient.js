/*
 * LICENSE_PLACEHOLDER
 */
import { AuthenticationClient } from '@regardsoss/client'

/**
 * Server Project entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['common', 'authentication']
const REDUX_ACTION_NAMESPACE = 'common/authentication-manager'

const authenticationReducers = AuthenticationClient.AuthenticateReducers(REDUX_ACTION_NAMESPACE)
const authenticationActions = AuthenticationClient.AuthenticateActions(REDUX_ACTION_NAMESPACE)
const authenticationSelectors = AuthenticationClient.AuthenticateSelectors(ENTITIES_STORE_PATH)

const SPECIFIC_ENDPOINT_MARKER = AuthenticationClient.SPECIFIC_ENDPOINT_MARKER
export default {
  authenticationReducers,
  authenticationActions,
  authenticationSelectors,
  SPECIFIC_ENDPOINT_MARKER,
}
