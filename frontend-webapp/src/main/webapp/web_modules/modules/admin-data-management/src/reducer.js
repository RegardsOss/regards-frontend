import { combineReducers } from 'redux'
import { modelDataManagementReducer } from '@regardsoss/admin-data-model-management'

const dataManagementReducer = combineReducers({
  'model-management': modelDataManagementReducer,
})


export default dataManagementReducer
