import { combineReducers } from 'redux'
import { modelReducer } from './clients/ModelClient'

const modelDataManagementReducer = combineReducers({
  model: modelReducer,
})

export default modelDataManagementReducer
