import BasicSelector from '@regardsoss/store-utils'


class ConnectionSelectors extends BasicSelector {
  constructor() {
    super(['admin', 'data-management', 'connection'])
  }

  getConnections(state) {
    return this.uncombineStore(state).items
  }
  getConnectionById(state, id) {
    return this.uncombineStore(state).state.items[id]
  }
}

const instance = new ConnectionSelectors()
export default instance
