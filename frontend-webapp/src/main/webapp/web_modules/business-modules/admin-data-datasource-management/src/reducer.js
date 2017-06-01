/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { modelReducer } from './clients/ModelClient'
import { connectionReducer } from './clients/ConnectionClient'
import { datasourceReducer } from './clients/DatasourceClient'
import { connectionTableReducer } from './clients/ConnectionTableClient'
import { connectionTableAttributesReducer } from './clients/ConnectionTableAttributesClient'
import { modelAttributesReducer } from './clients/ModelAttributesClient'
import { pluginMetaDataReducer } from './clients/PluginMetaDataClient'

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
