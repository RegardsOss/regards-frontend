import { BasicPageableSelectors } from '@regardsoss/store-utils'

class PluginSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'microservice-management', 'plugin'])
  }
}

const instance = new PluginSelectors()
export default instance
