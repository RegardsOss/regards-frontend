/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * Combine all reducers for this aa to a single root reducer.
 */
import { combineReducers } from 'redux'
import LayoutReducer from './model/layout/LayoutReducer'
import ModulesReducer from './model/modules/ModulesReducer'

export default combineReducers({
  layout: LayoutReducer,
  modules: ModulesReducer,
})
