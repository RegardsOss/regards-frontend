import { combineReducers } from 'redux'
import { modelDataManagementReducer } from '@regardsoss/admin-data-model-management'
import { attributeModelDataManagementReducer } from '@regardsoss/admin-data-attributemodel-management'
import { fragmentDataManagementReducer } from '@regardsoss/admin-data-fragment-management'

const dataManagementReducer = combineReducers({
  'model-management': modelDataManagementReducer,
  'attribute-model-management': attributeModelDataManagementReducer,
  'fragment-management': fragmentDataManagementReducer,
})


export default dataManagementReducer
