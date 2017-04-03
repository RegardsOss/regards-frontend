/**
* LICENSE_PLACEHOLDER
**/
import { combineReducers } from 'redux'
import { moduleUIReducer } from '@regardsoss/admin-ui-module-management'
import { layoutUIReducer } from '@regardsoss/admin-ui-layout-management'
import { pluginUIReducer } from '@regardsoss/admin-ui-plugin-management'
import { serviceUIReducer } from '@regardsoss/admin-ui-service-management'

/**
 * UI-Configuration module reducers
 * @type {Function}
 * @author Sébastien binda
 */
const uiConfigurationtReducer = combineReducers({
  layout: layoutUIReducer,
  plugin: pluginUIReducer,
  module: moduleUIReducer,
  /*service: serviceUIReducer,*/
})

export default uiConfigurationtReducer
