import { BasicSelector } from '@regardsoss/store-utils'

class AuthenticationSelectors extends BasicSelector {
  constructor() {
    super(['common', 'authentication'])
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

}

const instance = new AuthenticationSelectors()
export default instance
