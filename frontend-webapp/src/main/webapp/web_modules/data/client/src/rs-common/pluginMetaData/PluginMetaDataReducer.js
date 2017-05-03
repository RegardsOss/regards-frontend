/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { PluginMetaDataConfiguration } from '@regardsoss/api'
import PluginMetaDataActions from './PluginMetaDataActions'

/**
 * Redux store reducer for Collection entities
 * @author Léo Mieulet
 */
class PluginMetaDataReducer extends BasicListReducers {
  constructor(namespace) {
    super(PluginMetaDataConfiguration, new PluginMetaDataActions(namespace))
  }
}

export default (namespace) => {
  const instance = new PluginMetaDataReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
