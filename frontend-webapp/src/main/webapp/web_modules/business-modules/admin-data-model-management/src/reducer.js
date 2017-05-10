import { combineReducers } from 'redux'
import { modelReducer } from './client/ModelClient'

const modelDataManagementReducer = combineReducers({
  model: modelReducer,
})

export default modelDataManagementReducer
