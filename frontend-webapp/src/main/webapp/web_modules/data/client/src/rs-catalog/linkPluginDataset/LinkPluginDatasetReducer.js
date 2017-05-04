import { BasicPageableReducers } from '@regardsoss/store-utils'
import { LinkPluginDatasetConfiguration } from '@regardsoss/api'
import LinkPluginDatasetActions from './LinkPluginDatasetActions'

class LinkPluginDatasetReducer extends BasicPageableReducers {
  constructor(namespace) {
    super(LinkPluginDatasetConfiguration, new LinkPluginDatasetActions(namespace))
  }
}

export default (namespace) => {
  const instance = new LinkPluginDatasetReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
