import { BasicListSelectors } from '@regardsoss/store-utils'

class EndpointSelectors extends BasicListSelectors {
  constructor() {
    super(['common', 'endpoints'])
  }
}

const instance = new EndpointSelectors()
export default instance
