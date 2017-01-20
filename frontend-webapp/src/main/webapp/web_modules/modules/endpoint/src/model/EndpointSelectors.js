/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class EndpointSelectors extends BasicPageableSelectors {
  constructor() {
    super(['common', 'endpoints'])
  }
}

const instance = new EndpointSelectors()
export default instance
