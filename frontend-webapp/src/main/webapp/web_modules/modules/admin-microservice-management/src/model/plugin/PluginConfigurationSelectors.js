import { filter, pickBy } from 'lodash'
import { BasicPageableSelectors } from '@regardsoss/store-utils'

class PluginConfigurationSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'microservice-management', 'pluginConfiguration'])
  }

  getListByPluginClassName(state, pluginClassName) {
    return filter(this.getList(state), item => item.content.pluginClassName === pluginClassName)
  }

  getListByPluginId(state, pluginId) {
    return pickBy(this.getList(state), item => item.content.pluginId === pluginId)
  }

}

const instance = new PluginConfigurationSelectors()
export default instance
