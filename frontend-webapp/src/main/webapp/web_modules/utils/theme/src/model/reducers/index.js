/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { themeReducers } from '../../clients/ThemeClient'
import currentThemeReducer from './currentThemeReducer'

export default combineReducers({
  list: themeReducers,
  current: currentThemeReducer,
})
