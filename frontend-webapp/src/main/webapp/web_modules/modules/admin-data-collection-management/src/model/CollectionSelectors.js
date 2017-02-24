import { BasicPageableSelectors } from '@regardsoss/store-utils'

class CollectionSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'data-management', 'collection', 'collection'])
  }
}

const instance = new CollectionSelectors()
export default instance
