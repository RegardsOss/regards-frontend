/*
 * LICENSE_PLACEHOLDER
 */
import { AuthenticationClient } from '@regardsoss/client'

/**
 * Current user login information client.
 *
 * @author Léo Mieulet
 */
const ENTITIES_STORE_PATH = ['common', 'authentication']

const authenticationSelectors = AuthenticationClient.AuthenticateSelectors(ENTITIES_STORE_PATH)

export default {
  authenticationSelectors,
}
