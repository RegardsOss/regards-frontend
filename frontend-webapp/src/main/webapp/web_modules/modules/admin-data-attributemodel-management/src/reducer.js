import { combineReducers } from 'redux'
import { getAttributeModelReducer } from './model/AttributeModelReducers'

const attributeModelDataManagementReducer = combineReducers({
  'attribute-model': getAttributeModelReducer,
})

export default attributeModelDataManagementReducer
