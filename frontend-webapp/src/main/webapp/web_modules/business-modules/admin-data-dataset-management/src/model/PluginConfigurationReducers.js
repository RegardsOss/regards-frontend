/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AdminPluginConfigurationSchemaConfiguration } from '@regardsoss/api'
import {
  PluginConfigurationConvertersActions,
  PluginConfigurationServicesActions,
  PluginConfigurationFiltersActions,
} from './PluginConfigurationActions'

class PluginConfigurationReducers extends BasicPageableReducers {
  constructor(PluginConfigurationTypeActions) {
    super(AdminPluginConfigurationSchemaConfiguration, PluginConfigurationTypeActions)
  }

}

const instancePluginConfigurationConverter = new PluginConfigurationReducers(PluginConfigurationConvertersActions)
const instancePluginConfigurationService = new PluginConfigurationReducers(PluginConfigurationServicesActions)
const instancePluginConfigurationFilter = new PluginConfigurationReducers(PluginConfigurationFiltersActions)

/**
 * Return an function where the reducer instance exists
 *
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function pluginConfigurationConverters(state, action) {
  return instancePluginConfigurationConverter.reduce(state, action)
}


/**
 * Return an function where the reducer instance exists
 *
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function pluginConfigurationServices(state, action) {
  return instancePluginConfigurationService.reduce(state, action)
}


/**
 * Return an function where the reducer instance exists
 *
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function pluginConfigurationFilters(state, action) {
  return instancePluginConfigurationFilter.reduce(state, action)
}
