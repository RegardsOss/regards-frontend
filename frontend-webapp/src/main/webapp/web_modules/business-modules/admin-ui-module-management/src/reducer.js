/**
* LICENSE_PLACEHOLDER
**/
import { combineReducers } from 'redux'
import { moduleReducers } from './clients/ModuleClient'
import { moduleInstanceReducers } from './clients/ModuleInstanceClient'
import { layoutReducers } from './clients/LayoutClient'
import { layoutInstanceReducers } from './clients/LayoutInstanceClient'

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
