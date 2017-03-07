import { BasicPageableSelectors } from '@regardsoss/store-utils'

class DatasourceSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'data-management', 'dataset', 'datasource'])
  }
}

const instance = new DatasourceSelectors()
export default instance
