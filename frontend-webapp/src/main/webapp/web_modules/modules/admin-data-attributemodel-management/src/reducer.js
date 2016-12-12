import { combineReducers } from 'redux'
import { getAttributeModelReducer } from './model/AttributeModelReducers'

const attributeModelDataManagementReducer = combineReducers({
  model: getAttributeModelReducer,
})

export default attributeModelDataManagementReducer
