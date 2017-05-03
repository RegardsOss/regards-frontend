/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalSelectors } from '@regardsoss/store-utils'

class AuthenticateSelectors extends BasicSignalSelectors {

  getAuthentication(state) {
    return this.uncombineStore(state)
  }

  getAuthenticationResult(state) {
    const authentication = this.getAuthentication(state)
    if (authentication) {
      return authentication.result
    }
    return authentication
  }

  /**
   * Is a user authenticated (based on last fetch result)
   * @param state state
   * @returns {boolean}
   */
  isAuthenticated(state) {
    const authentication = this.getAuthentication(state)
    if (authentication && authentication.authenticateDate &&
      authentication.result && authentication.result.expires_in) {
      return authentication.result.sub !== undefined
    }
    return false
  }

  getAccessToken(state) {
    return this.getAuthentication(state).result.access_token
  }

}

export default storePath => new AuthenticateSelectors(storePath)
