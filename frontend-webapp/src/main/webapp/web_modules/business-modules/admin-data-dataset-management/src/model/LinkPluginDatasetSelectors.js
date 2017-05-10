import { BasicPageableSelectors } from '@regardsoss/store-utils'

class LinkPluginDatasetSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'data-management', 'dataset', 'link-plugin-dataset'])
  }
}

const instance = new LinkPluginDatasetSelectors()
export default instance
