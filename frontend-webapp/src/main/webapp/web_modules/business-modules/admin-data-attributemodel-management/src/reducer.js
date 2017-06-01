import { combineReducers } from 'redux'
import { attributeModelReducer } from './clients/AttributeModelClient'
import { attributeModelRestrictionReducer } from './clients/AttributeModelRestrictionClient'
import { attributeModelTypeReducer } from './clients/AttributeModelTypeClient'
import { fragmentReducer } from './clients/FragmentClient'

const attributeModelDataManagementReducer = combineReducers({
  'attribute-model': attributeModelReducer,
  'attribute-model-type': attributeModelTypeReducer,
  'attribute-model-restriction': attributeModelRestrictionReducer,
  fragment: fragmentReducer,

})

export default attributeModelDataManagementReducer
