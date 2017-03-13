/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import connectionReducers from './model/ConnectionReducers'
import testConnectionReducers from './model/TestConnectionReducers'
import pluginMetaDataReducers from './model/PluginMetaDataReducers'

const connectionDataManagementReducer = combineReducers({
  connection: connectionReducers,
  'test-connection': testConnectionReducers,
  'plugin-meta-data': pluginMetaDataReducers,
})

export default connectionDataManagementReducer
