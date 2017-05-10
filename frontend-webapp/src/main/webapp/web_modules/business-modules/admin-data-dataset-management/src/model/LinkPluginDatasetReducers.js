import { BasicPageableReducers } from '@regardsoss/store-utils'
import { LinkPluginDatasetConfiguration } from '@regardsoss/api'
import LinkPluginDatasetActions from './LinkPluginDatasetActions'

class LinkPluginDatasetReducers extends BasicPageableReducers {
  constructor() {
    super(LinkPluginDatasetConfiguration, LinkPluginDatasetActions)
  }
}

const instance = new LinkPluginDatasetReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
