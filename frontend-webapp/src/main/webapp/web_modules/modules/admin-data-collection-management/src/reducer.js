/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { collectionReducer } from './client/CollectionClient'
import { modelReducer } from './client/ModelClient'
import { modelAttributesReducer } from './client/ModelAttributesClient'
import { collectionLinkReducer } from './client/CollectionLinkClient'

const collectionDataManagementReducer = combineReducers({
  collection: collectionReducer,
  model: modelReducer,
  'model-attribute': modelAttributesReducer,
  'collection-link': collectionLinkReducer,
})

export default collectionDataManagementReducer
