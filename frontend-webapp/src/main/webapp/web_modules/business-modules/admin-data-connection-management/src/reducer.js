/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { connectionReducer } from './client/ConnectionClient'
import { connectionTestReducer } from './client/ConnectionTestClient'
import { pluginMetaDataReducer } from './client/PluginMetaDataClient'

const connectionDataManagementReducer = combineReducers({
  connection: connectionReducer,
  'connection-test': connectionTestReducer,
  'plugin-meta-data': pluginMetaDataReducer,
})

export default connectionDataManagementReducer
