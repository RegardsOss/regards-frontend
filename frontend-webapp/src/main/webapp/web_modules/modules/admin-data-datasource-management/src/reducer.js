/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import datasource from './model/DatasourceReducers'
import model from './model/ModelReducers'
import connection from './model/ConnectionReducers'
import connectionTable from './model/ConnectionTableReducers'
import connectionTableAttributes from './model/ConnectionTableAttributesReducers'
import modelAttribute from './model/ModelAttributesReducers'

const datasourceDataManagementReducer = combineReducers({
  datasource,
  model,
  connection,
  'model-attribute': modelAttribute,
  'connection-table': connectionTable,
  'connection-table-attributes': connectionTableAttributes,
})

export default datasourceDataManagementReducer
