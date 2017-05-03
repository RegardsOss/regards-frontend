/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalSelectors } from '@regardsoss/store-utils'

class MyUserSelectors extends BasicSignalSelectors {

  /**
   * Returns fetched user on last REST action (since both GET and PUT should return user data)
   * @param {*} state redux store
   */
  getMyUser(state) {
    return this.uncombineStore(state).result || null
  }

}

/**
 * Builds selectors on expected store path
 */
export default storePath => new MyUserSelectors(storePath)
