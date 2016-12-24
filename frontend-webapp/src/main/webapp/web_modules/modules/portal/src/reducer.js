/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * Combine all reducers for this aa to a single root reducer.
 */
import { forEach } from 'lodash'
import { combineReducers } from 'redux'
import { reducer } from '@regardsoss/projects-list'
import LayoutReducer from './model/layout/LayoutReducer'
import ModulesReducer from './model/modules/ModulesReducer'

export default combineReducers({
  layout: LayoutReducer,
  'layout.modules': ModulesReducer,
  ...reducer,
})
