/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { AdminPluginConfigurationSchemaConfiguration } from '@regardsoss/api'
import PluginConfigurationActions from './PluginConfigurationActions'

class PluginConfigurationReducers extends BasicListReducers {
  constructor(namespace) {
    super(AdminPluginConfigurationSchemaConfiguration, new PluginConfigurationActions(namespace))
  }

}

export default (namespace) => {
  const instance = new PluginConfigurationReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
