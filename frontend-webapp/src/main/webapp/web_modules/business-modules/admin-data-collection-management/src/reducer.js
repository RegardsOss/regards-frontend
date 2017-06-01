/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { collectionReducer } from './clients/CollectionClient'
import { modelReducer } from './clients/ModelClient'
import { modelAttributesReducer } from './clients/ModelAttributesClient'
import { collectionLinkReducer } from './clients/CollectionLinkClient'

const collectionDataManagementReducer = combineReducers({
  collection: collectionReducer,
  model: modelReducer,
  'model-attribute': modelAttributesReducer,
  'collection-link': collectionLinkReducer,
})

export default collectionDataManagementReducer
