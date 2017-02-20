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
   * Is a user authenticated
   * @param state state
   * @returns {boolean}
   */
  isAuthenticated(state) {
    const authentication = this.getAuthentication(state)
    if (authentication && authentication.authenticateDate &&
      authentication.user && authentication.user.expires_in) {
      const expired = authentication.authenticateDate + (authentication.user.expires_in * 1000) < Date.now()
      return authentication.user.name !== undefined && !expired
    }
    return false
  }

  getError(state) {
    const auth = this.getAuthentication(state)
    return auth && auth.error
  }

}

const instance = new AuthenticateSelectors()
export default instance
