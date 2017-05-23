/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { datasetReducer } from './clients/DatasetClient'
import { accessRightReducer } from './clients/AccessRightClient'
import { accessGroupReducer } from './clients/AccessGroupClient'
import { pluginConfigurationReducer } from './clients/PluginConfigurationClient'
import { pluginMetadataReducer } from './clients/PluginMetadataClient'
import { tableReducer } from './clients/TableClient'

const accessRightManagementReducer = combineReducers({
  dataset: datasetReducer,
  'access-right': accessRightReducer,
  'access-group': accessGroupReducer,
  'plugin-configuration': pluginConfigurationReducer,
  'plugin-meta-data': pluginMetadataReducer,
  'access-right-table': tableReducer,
})

export default accessRightManagementReducer
