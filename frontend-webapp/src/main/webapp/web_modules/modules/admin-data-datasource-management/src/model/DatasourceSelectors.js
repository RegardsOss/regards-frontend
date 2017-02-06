import { BasicPageableSelectors } from '@regardsoss/store-utils'

class FragmentSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'data-management', 'datasource', 'datasource'])
  }
}

const instance = new FragmentSelectors()
export default instance
