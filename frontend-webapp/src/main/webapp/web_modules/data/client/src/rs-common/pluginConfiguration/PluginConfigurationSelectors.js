/**
 * LICENSE_PLACEHOLDER
 **/
import flow from 'lodash/flow'
import fpfilter from 'lodash/fp/filter'
import fpsortBy from 'lodash/fp/sortBy'
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
    return flow(
      fpfilter(pluginConfiguration => pluginConfiguration.content.active),
      fpsortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder),
  )(this.getList(state))
  }

  getListInactiveAndSorted(state) {
    return flow(
      fpfilter(pluginConfiguration => !pluginConfiguration.content.active),
      fpsortBy(pluginConfiguration => -1 * pluginConfiguration.content.priorityOrder),
    )(this.getList(state))
  }
}

export default storePath => new PluginConfigurationSelectors(storePath)
