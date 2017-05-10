/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class EndpointSelectors extends BasicPageableSelectors {
  constructor() {
    super(['common', 'endpoints'])
  }

  getListOfKeys(state) {
    return this.uncombineStore(state).listOfKeys
  }
}

const instance = new EndpointSelectors()
export default instance
