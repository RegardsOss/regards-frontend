/**
 * LICENSE_PLACEHOLDER
 **/
import { chain } from 'lodash'
import filter from 'lodash/filter'
import pickBy from 'lodash/pickBy'
import { BasicListSelectors } from '@regardsoss/store-utils'

class PluginConfigurationSelectors extends BasicListSelectors {

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

export default storePath => new PluginConfigurationSelectors(storePath)
