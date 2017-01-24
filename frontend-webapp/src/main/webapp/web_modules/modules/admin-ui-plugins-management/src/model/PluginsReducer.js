/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { PluginConfiguration } from '@regardsoss/api'
import PluginsActions from './PluginsActions'

/**
 * Redux store reducer for Module entities
 */
class PluginsReducer extends BasicPageableReducers {
  constructor() {
    super(PluginConfiguration, PluginsActions)
  }

}

const instance = new PluginsReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getPluginsReducer = (state, action) => instance.reduce(state, action)

export default getPluginsReducer
