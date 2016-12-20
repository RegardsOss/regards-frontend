import { combineReducers } from 'redux'
import { getAttributeModelReducer } from './model/AttributeModelReducers'
import attrModelTypeReducer from './model/AttributeModelTypeReducers'

const attributeModelDataManagementReducer = combineReducers({
  'attribute-model': getAttributeModelReducer,
  'attribute-model-type': attrModelTypeReducer,

})

export default attributeModelDataManagementReducer
