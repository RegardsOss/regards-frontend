import { BasicListReducers } from '@regardsoss/store-utils'
import { LinkUIPluginDatasetConfiguration } from '@regardsoss/api'
import LinkUIPluginDatasetActions from './LinkUIPluginDatasetActions'

class LinkUIPluginDatasetReducer extends BasicListReducers {
  constructor(namespace) {
    super(LinkUIPluginDatasetConfiguration, new LinkUIPluginDatasetActions(namespace))
  }
}

export default (namespace) => {
  const instance = new LinkUIPluginDatasetReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
