/**
* LICENSE_PLACEHOLDER
**/
import { combineReducers } from 'redux'
import { moduleUIReducer } from '@regardsoss/admin-ui-module-management'
import { layoutUIReducer } from '@regardsoss/admin-ui-layout-management'
import { pluginUIReducer } from '@regardsoss/admin-ui-plugin-management'

/**
 * UI-Configuration module reducers
 * @type {Function}
 * @author Sébastien binda
 */
const uiConfigurationtReducer = combineReducers({
  layout: layoutUIReducer,
  plugin: pluginUIReducer,
  module: moduleUIReducer,
})

export default uiConfigurationtReducer
