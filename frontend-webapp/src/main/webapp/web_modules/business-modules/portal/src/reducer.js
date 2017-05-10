/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * Combine all reducers for this aa to a single root reducer.
 */
import { combineReducers } from 'redux'
import LayoutReducer from './model/layout/LayoutReducer'
import LayoutModulesReducer from './model/modules/ModulesReducer'

/**
 * Portal reducers
 * @author Sébastien Binda
 */
export default combineReducers({
  layout: LayoutReducer,
  'layout.modules': LayoutModulesReducer,
})
