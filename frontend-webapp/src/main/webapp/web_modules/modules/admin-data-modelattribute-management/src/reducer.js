/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import attributeModelReducer from './model/AttributeModelReducers'
import modelReducer from './model/ModelReducers'
import modelAttributeReducer from './model/ModelAttributeReducers'
import modelAttributeFragmentReducer from './model/ModelAttributeFragmentReducers'


const modelAttributeDataManagementReducer = combineReducers({
  'attribute-model': attributeModelReducer,
  model: modelReducer,
  'model-attribute': modelAttributeReducer,
  'model-attribute-fragment': modelAttributeFragmentReducer,
})

export default modelAttributeDataManagementReducer
