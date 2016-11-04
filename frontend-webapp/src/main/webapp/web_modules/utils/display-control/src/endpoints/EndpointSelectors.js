import BasicSelector from '@regardsoss/store-utils'

class EndpointSelectors extends BasicSelector {
  constructor() {
    super(['common', 'endpoints'])
  }
  getEndpointsItems(state) {
    return this.uncombineStore(state).items
  }

}

const instance = new EndpointSelectors()

export default instance
