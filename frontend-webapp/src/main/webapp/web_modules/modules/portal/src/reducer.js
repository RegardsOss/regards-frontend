/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * Combine all reducers for this aa to a single root reducer.
 */
import { combineReducers } from 'redux'
import { ModulesReducers } from '@regardsoss/modules'
import LayoutReducer from './model/layout/LayoutReducer'
import LayoutModulesReducer from './model/modules/ModulesReducer'

export default combineReducers({
  layout: LayoutReducer,
  'layout.modules': LayoutModulesReducer,
  modules: ModulesReducers,
})
