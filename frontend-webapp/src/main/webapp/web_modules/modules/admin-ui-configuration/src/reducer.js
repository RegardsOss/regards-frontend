/**
* LICENSE_PLACEHOLDER
**/
import { combineReducers } from 'redux'
import getModulesReducer from './model/modules/ModulesReducer'
import getLayoutReducer from './model/layout/LayoutReducer'

/**
 * UI-Configuration module reducers
 * @type {Function}
 */
const uiConfigurationtReducer = combineReducers({
  layout: getLayoutReducer,
  modules: getModulesReducer,
})

export default uiConfigurationtReducer
