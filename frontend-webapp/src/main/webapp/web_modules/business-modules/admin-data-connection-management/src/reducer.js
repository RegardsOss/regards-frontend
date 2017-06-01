/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { connectionReducer } from './clients/ConnectionClient'
import { connectionTestReducer } from './clients/ConnectionTestClient'
import { pluginMetaDataReducer } from './clients/PluginMetaDataClient'

const connectionDataManagementReducer = combineReducers({
  connection: connectionReducer,
  'connection-test': connectionTestReducer,
  'plugin-meta-data': pluginMetaDataReducer,
})

export default connectionDataManagementReducer
