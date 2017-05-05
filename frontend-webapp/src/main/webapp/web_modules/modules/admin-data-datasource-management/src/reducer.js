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

const datasourceDataManagementReducer = combineReducers({
  datasource: datasourceReducer,
  connection: connectionReducer,
  model: modelReducer,
  'model-attributes': modelAttributesReducer,
  'connection-table': connectionTableReducer,
  'connection-table-attributes': connectionTableAttributesReducer,
})

export default datasourceDataManagementReducer
