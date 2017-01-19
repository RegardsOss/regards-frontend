import { BasicPageableSelectors } from '@regardsoss/store-utils'

class PluginConfigurationSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'microservice-management', 'pluginConfiguration'])
  }
}

const instance = new PluginConfigurationSelectors()
export default instance
