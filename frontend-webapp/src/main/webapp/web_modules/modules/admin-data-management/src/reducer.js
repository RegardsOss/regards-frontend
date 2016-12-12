import { combineReducers } from 'redux'
import { modelDataManagementReducer } from '@regardsoss/admin-data-model-management'
import { attributeModelDataManagementReducer } from '@regardsoss/admin-data-attributemodel-management'

const dataManagementReducer = combineReducers({
  'model-management': modelDataManagementReducer,
  'attribute-model-management': attributeModelDataManagementReducer,
})


export default dataManagementReducer
