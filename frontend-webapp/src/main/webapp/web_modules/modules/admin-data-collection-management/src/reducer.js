/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import collection from './model/CollectionReducers'
import model from './model/ModelReducers'
import modelAttribute from './model/ModelAttributeReducers'
import collectionLinkSignal from './model/CollectionLinkReducers'

const collectionDataManagementReducer = combineReducers({
  collection,
  model,
  'model-attribute': modelAttribute,
  'collection-link': collectionLinkSignal,
})

export default collectionDataManagementReducer
