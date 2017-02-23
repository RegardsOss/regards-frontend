/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import ListReducers from './ThemeReducers'
import CurrentThemeReducers from './CurrentThemeReducers'

export default combineReducers({
  list: ListReducers,
  current: CurrentThemeReducers,
})
