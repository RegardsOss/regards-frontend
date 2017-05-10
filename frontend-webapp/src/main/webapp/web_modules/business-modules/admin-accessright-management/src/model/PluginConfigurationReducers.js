/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AdminPluginConfigurationSchemaConfiguration } from '@regardsoss/api'
import PluginConfigurationActions from './PluginConfigurationActions'

class PluginConfigurationReducers extends BasicPageableReducers {
  constructor() {
    super(AdminPluginConfigurationSchemaConfiguration, PluginConfigurationActions)
  }

}

const instance = new PluginConfigurationReducers()

/**
 * Return an function where the reducer instance exists
 *
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
