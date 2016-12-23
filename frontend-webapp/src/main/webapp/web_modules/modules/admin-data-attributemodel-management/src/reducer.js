import { combineReducers } from 'redux'
import attributeModelReducer from './model/AttributeModelReducers'
import attributeModelRestrictionReducers from './model/AttributeModelRestrictionReducers'
import attrModelTypeReducer from './model/AttributeModelTypeReducers'
import fragmentReducer from './model/FragmentReducers'
const attributeModelDataManagementReducer = combineReducers({
  'attribute-model': attributeModelReducer,
  'attribute-model-type': attrModelTypeReducer,
  'attribute-model-restriction': attributeModelRestrictionReducers,
  fragment: fragmentReducer,

})

export default attributeModelDataManagementReducer
