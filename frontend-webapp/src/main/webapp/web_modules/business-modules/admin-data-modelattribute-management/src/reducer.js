/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { attributeModelReducer } from './client/AttributeModelClient'
import { modelReducer } from './client/ModelClient'
import { modelAttributesReducer } from './client/ModelAttributesClient'
import { modelAttributesFragmentReducer } from './client/ModelAttributesFragmentClient'

const modelAttributeDataManagementReducer = combineReducers({
  'attribute-model': attributeModelReducer,
  model: modelReducer,
  'model-attribute': modelAttributesReducer,
  'model-attribute-fragment': modelAttributesFragmentReducer,
})

export default modelAttributeDataManagementReducer
