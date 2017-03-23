/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { PluginMetaDataConfiguration } from '@regardsoss/api'
import PluginMetaDataActions from './PluginMetaDataActions'

class PluginMetaDataReducers extends BasicPageableReducers {
  constructor() {
    super(PluginMetaDataConfiguration, PluginMetaDataActions)
  }
}

const instance = new PluginMetaDataReducers()

/**
 * Return an function where the reducer instance exists
 *
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getPluginMetaDataReducer = (state, action) => instance.reduce(state, action)

export default getPluginMetaDataReducer
