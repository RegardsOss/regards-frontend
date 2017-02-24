/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import datasource from './model/DatasourceReducers'
import model from './model/ModelReducers'
import connection from './model/ConnectionReducers'
import modelAttribute from './model/ModelAttributeReducers'
import datasourceLinkSignal from './model/DatasourceLinkReducers'

const datasourceDataManagementReducer = combineReducers({
  datasource,
  model,
  connection,
  'model-attribute': modelAttribute,
  'datasource-link': datasourceLinkSignal,
})

export default datasourceDataManagementReducer
