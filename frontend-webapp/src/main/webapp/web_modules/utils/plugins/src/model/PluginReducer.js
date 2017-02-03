/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { PluginConfiguration } from '@regardsoss/api'
import PluginActions from './PluginActions'

/**
 * Redux store reducer for Module entities
 * @author Sébastien Binda
 */
class PluginReducer extends BasicPageableReducers {
  constructor() {
    super(PluginConfiguration, PluginActions)
  }

}

const instance = new PluginReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getPluginReducer = (state, action) => instance.reduce(state, action)

export default getPluginReducer
