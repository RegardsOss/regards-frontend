/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { getAIPStatusMonitoringReducer } from './model/AIPStatusMonitoringReducers'

const aipStatusReducer = combineReducers({
  'storage-monitoring': getAIPStatusMonitoringReducer,
})

export default aipStatusReducer

