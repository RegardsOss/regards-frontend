/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

/**
 * State selector to retrieve stored endpoints
 *
 * @author Sébastien Binda
 */
class EndpointSelectors extends BasicPageableSelectors {

  getListOfKeys(state) {
    return this.uncombineStore(state).listOfKeys
  }

}

export default storePath => new EndpointSelectors(storePath)
