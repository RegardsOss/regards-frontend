/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { modelReducer } from './client/ModelClient'
import { connectionReducer } from './client/ConnectionClient'
import { datasourceReducer } from './client/DatasourceClient'
import { connectionTableReducer } from './client/ConnectionTableClient'
import { connectionTableAttributesReducer } from './client/ConnectionTableAttributesClient'
import { modelAttributesReducer } from './client/ModelAttributesClient'
import { pluginMetaDataReducer } from './client/PluginMetaDataClient'

const datasourceDataManagementReducer = combineReducers({
  datasource: datasourceReducer,
  connection: connectionReducer,
  model: modelReducer,
  'model-attributes': modelAttributesReducer,
  'connection-table': connectionTableReducer,
  'connection-table-attributes': connectionTableAttributesReducer,
  'plugin-meta-data': pluginMetaDataReducer,
})

export default datasourceDataManagementReducer
