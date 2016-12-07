import { combineReducers } from 'redux'
import { getModelReducer } from './model/ModelReducers'

const modelDataManagementReducer = combineReducers({
  model: getModelReducer,
})

export default modelDataManagementReducer
