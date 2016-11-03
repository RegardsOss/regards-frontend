import { BasicSelector } from '@regardsoss/store-utils'

// Selectors
export const getDatasets = state => state.items

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


export default new ConnectionSelectors()
