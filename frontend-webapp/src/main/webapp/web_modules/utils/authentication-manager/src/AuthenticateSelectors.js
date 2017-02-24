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
      const expired = authentication.authenticateDate + (authentication.result.expires_in * 1000) < Date.now()
      return authentication.result.name !== undefined && !expired
    }
    return false
  }

}

const instance = new AuthenticateSelectors()
export default instance
