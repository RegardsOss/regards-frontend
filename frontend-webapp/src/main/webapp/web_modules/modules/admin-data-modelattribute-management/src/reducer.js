/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import attributeModelReducer from './model/AttributeModelReducers'
import modelReducer from './model/ModelReducers'
import modelAttributesReducer from './model/ModelAttributesReducers'
import modelAttributeFragmentReducer from './model/ModelAttributeFragmentReducers'


const modelAttributeDataManagementReducer = combineReducers({
  'attribute-model': attributeModelReducer,
  model: modelReducer,
  'model-attribute': modelAttributesReducer,
  'model-attribute-fragment': modelAttributeFragmentReducer,
})

export default modelAttributeDataManagementReducer
