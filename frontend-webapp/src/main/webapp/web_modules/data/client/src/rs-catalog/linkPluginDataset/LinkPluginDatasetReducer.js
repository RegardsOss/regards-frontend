import { BasicListReducers } from '@regardsoss/store-utils'
import { LinkPluginDatasetConfiguration } from '@regardsoss/api'
import LinkPluginDatasetActions from './LinkPluginDatasetActions'

class LinkPluginDatasetReducer extends BasicListReducers {
  constructor(namespace) {
    super(LinkPluginDatasetConfiguration, new LinkPluginDatasetActions(namespace))
  }
}

export default (namespace) => {
  const instance = new LinkPluginDatasetReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
