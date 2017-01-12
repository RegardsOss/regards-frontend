import { BasicPageableSelectors } from '@regardsoss/store-utils'

class PluginMetaDataSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'microservice-management', 'plugin'])
  }
}

const instance = new PluginMetaDataSelectors()
export default instance
