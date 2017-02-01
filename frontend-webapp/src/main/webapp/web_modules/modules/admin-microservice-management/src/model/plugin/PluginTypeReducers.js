/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicArrayReducers } from '@regardsoss/store-utils'
import PluginTypeActions from './PluginTypeActions'

/**
 * Reducers for plugin types
 *
 * @author Xavier-Alexandre Brochard
 */
class PluginMetaDataReducers extends BasicArrayReducers {
  constructor() {
    super(PluginTypeActions)
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
const getPluginMetaDataReducers = (state, action) => instance.reduce(state, action)

export default getPluginMetaDataReducers

