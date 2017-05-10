import { combineReducers } from 'redux'
import getAccountReducer, { PATHNAME as ACCOUNT_REDUCER_PATH } from './model/AccountReducers'
import getWaitingAccountEntitiesReducer, { PATHNAME as WAITING_ACCOUNT_FETCH_REDUCER_PATH } from './model/WaitingAccountEntitiesReducers'
import getWaitingAccountSignalReducer, { PATHNAME as WAITING_ACCOUNT_UPDATE_REDUCER_PATH } from './model/WaitingAccountSignalReducers'

const accountManagementReducer = combineReducers({
  [ACCOUNT_REDUCER_PATH]: getAccountReducer,
  [WAITING_ACCOUNT_FETCH_REDUCER_PATH]: getWaitingAccountEntitiesReducer,
  [WAITING_ACCOUNT_UPDATE_REDUCER_PATH]: getWaitingAccountSignalReducer,
})

export default accountManagementReducer
