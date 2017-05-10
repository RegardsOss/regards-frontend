/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { connectionReducer } from './client/ConnectionClient'
import testConnectionReducers from './model/TestConnectionReducers'
import { pluginMetaDataReducer } from './client/PluginMetaDataClient'

const connectionDataManagementReducer = combineReducers({
  connection: connectionReducer,
  'test-connection': testConnectionReducers,
  'plugin-meta-data': pluginMetaDataReducer,
})

export default connectionDataManagementReducer
