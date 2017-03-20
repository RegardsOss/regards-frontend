import { BasicPageableSelectors } from '@regardsoss/store-utils'

class DatasetSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'data-management', 'dataset', 'dataset'])
  }
}

const instance = new DatasetSelectors()
export default instance
