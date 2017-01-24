/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { getAIPStatusReducer } from './model/AIPStatusReducers'

const reducers = combineReducers({
  'aip-status': getAIPStatusReducer,
})

export default reducers

