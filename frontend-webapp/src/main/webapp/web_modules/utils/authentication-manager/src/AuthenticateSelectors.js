/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSelector } from '@regardsoss/store-utils'
import { pathname as reducerPath } from './AuthenticateReducers'

class AuthenticateSelectors extends BasicSelector {
  constructor() {
    super(['common', reducerPath])
  }

  getAuthentication(state) {
    return this.uncombineStore(state)
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

}

export default new AuthenticateSelectors()
