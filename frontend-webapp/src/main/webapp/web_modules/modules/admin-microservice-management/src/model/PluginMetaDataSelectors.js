import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { chain, filter, map } from 'lodash'

class PluginMetaDataSelectors extends BasicPageableSelectors {
  constructor() {
    super(['admin', 'microservice-management', 'pluginMetaData'])
  }

  getListWrappedWithType(state) {
    const list = this.getList(state)
    const types = chain(list).map(plugin => plugin.content.pluginType).sortedUniq().value()
    return map(types, value => ({
      type: value,
      items: filter(list, plugin => plugin.content.pluginType === value),
    }))
  }

}

const instance = new PluginMetaDataSelectors()
export default instance
