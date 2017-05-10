import { combineReducers } from 'redux'
import { attributeModelReducer } from './client/AttributeModelClient'
import { attributeModelRestrictionReducer } from './client/AttributeModelRestrictionClient'
import { attributeModelTypeReducer } from './client/AttributeModelTypeClient'
import { fragmentReducer } from './client/FragmentClient'

const attributeModelDataManagementReducer = combineReducers({
  'attribute-model': attributeModelReducer,
  'attribute-model-type': attributeModelTypeReducer,
  'attribute-model-restriction': attributeModelRestrictionReducer,
  fragment: fragmentReducer,

})

export default attributeModelDataManagementReducer
