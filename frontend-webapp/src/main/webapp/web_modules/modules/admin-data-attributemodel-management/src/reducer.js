import { combineReducers } from 'redux'
import { getAttributeModelReducer } from './model/AttributeModelReducers'
import AttributeModelRestrictionReducers from './model/AttributeModelRestrictionReducers'
import attrModelTypeReducer from './model/AttributeModelTypeReducers'

const attributeModelDataManagementReducer = combineReducers({
  'attribute-model': getAttributeModelReducer,
  'attribute-model-type': attrModelTypeReducer,
  'attribute-model-restriction': AttributeModelRestrictionReducers,
})

export default attributeModelDataManagementReducer
