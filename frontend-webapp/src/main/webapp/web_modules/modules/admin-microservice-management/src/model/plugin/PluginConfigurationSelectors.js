import { chain, filter, pickBy } from 'lodash'
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

  getListActiveAndSorted(state) {
    return chain(this.getList(state))
      .filter(pluginConfiguration => pluginConfiguration.content.active)
      .sortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder)
      .value()
  }

  getListInactiveAndSorted(state) {
    return chain(this.getList(state))
      .filter(pluginConfiguration => !pluginConfiguration.content.active)
      .sortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder)
      .value()
  }

}

const instance = new PluginConfigurationSelectors()
export default instance
