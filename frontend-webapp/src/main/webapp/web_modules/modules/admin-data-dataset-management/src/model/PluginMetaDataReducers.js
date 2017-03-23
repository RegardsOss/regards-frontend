/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { PluginMetaDataConfiguration } from '@regardsoss/api'
import {
  PluginMetaDataConvertersActions,
  PluginMetaDataServicesActions,
  PluginMetaDataFiltersActions,
} from './PluginMetaDataActions'

class PluginMetaDataReducers extends BasicPageableReducers {
  constructor(PluginMetaDataActions) {
    super(PluginMetaDataConfiguration, PluginMetaDataActions)
  }
}


const instancePluginMetaDataConverter = new PluginMetaDataReducers(PluginMetaDataConvertersActions)
const instancePluginMetaDataService = new PluginMetaDataReducers(PluginMetaDataServicesActions)
const instancePluginMetaDataFilter = new PluginMetaDataReducers(PluginMetaDataFiltersActions)

/**
 * Return an function where the reducer instance exists
 *
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function pluginMetaDataConverters(state, action) {
  return instancePluginMetaDataConverter.reduce(state, action)
}


/**
 * Return an function where the reducer instance exists
 *
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function pluginMetaDataServices(state, action) {
  return instancePluginMetaDataService.reduce(state, action)
}


/**
 * Return an function where the reducer instance exists
 *
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function pluginMetaDataFilters(state, action) {
  return instancePluginMetaDataFilter.reduce(state, action)
}
