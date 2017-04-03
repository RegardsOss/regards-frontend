/**
* LICENSE_PLACEHOLDER
**/
import { combineReducers } from 'redux'
import getModulesReducer from './model/modules/ModulesReducer'
import getLayoutReducer from './model/layout/LayoutReducer'

/**
 * UI-Configuration module reducers
 * @type {Function}
 * @author Sébastien binda
 */
const uiConfigurationtReducer = combineReducers({
  layout: getLayoutReducer,
  module: getModulesReducer,
})

export default uiConfigurationtReducer
