/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import ListReducers from './ThemeReducers'
import currentThemeReducer from './currentThemeReducer'

export default combineReducers({
  list: ListReducers,
  current: currentThemeReducer,
})
