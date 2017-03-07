import { BasicListSelectors } from '@regardsoss/store-utils'

class ConnectionSelectors extends BasicListSelectors {
  constructor() {
    super(['admin', 'data-management', 'connection', 'connection'])
  }
}

const instance = new ConnectionSelectors()
export default instance
