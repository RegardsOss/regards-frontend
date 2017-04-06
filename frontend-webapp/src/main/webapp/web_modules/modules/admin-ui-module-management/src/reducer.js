/**
* LICENSE_PLACEHOLDER
**/
import { combineReducers } from 'redux'
import { moduleReducers } from './client/ModuleClient'
import { moduleInstanceReducers } from './client/ModuleInstanceClient'
import { layoutReducers } from './client/LayoutClient'
import { layoutInstanceReducers } from './client/LayoutInstanceClient'

/**
 * UI-Configuration module reducers
 * @type {Function}
 * @author Sébastien binda
 */
const uiConfigurationtReducer = combineReducers({
  modules: moduleReducers,
  'modules-instance': moduleInstanceReducers,
  layouts: layoutReducers,
  'layouts-instance': layoutInstanceReducers,
})

export default uiConfigurationtReducer
