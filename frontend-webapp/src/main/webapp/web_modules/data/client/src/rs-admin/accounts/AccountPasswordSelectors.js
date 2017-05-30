/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalSelectors } from '@regardsoss/store-utils'

class AccountPasswordSelectors extends BasicSignalSelectors {

  getValidity(state) {
    return this.uncombineStore(state).validity
  }

  getRules(state) {
    return this.uncombineStore(state).rules
  }

}

export default storePath => new AccountPasswordSelectors(storePath)
