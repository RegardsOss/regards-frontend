import { filter } from 'lodash'
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class PluginConfigurationSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'microservice-management', 'pluginConfiguration'])
  }

  getListByPluginClassName(state, pluginClassName) {
    return filter(this.getList(state), item => item.content.pluginClassName === pluginClassName)
  }

}

const instance = new PluginConfigurationSelectors()
export default instance
