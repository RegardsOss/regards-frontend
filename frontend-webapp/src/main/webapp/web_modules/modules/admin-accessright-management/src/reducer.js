/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import accessRightReducer from './model/AccessRightReducers'
import accessGroupReducer from './model/AccessGroupReducers'
import datasetReducers from './model/DatasetReducers'
import pluginConfigurationReducers from './model/PluginConfigurationReducers'
import pluginMetaDataReducers from './model/PluginMetaDataReducers'

const accessRightManagementReducer = combineReducers({
  dataset: datasetReducers,
  'access-right': accessRightReducer,
  'access-group': accessGroupReducer,
  'plugin-configuration': pluginConfigurationReducers,
  'plugin-meta-data': pluginMetaDataReducers,
})

export default accessRightManagementReducer
