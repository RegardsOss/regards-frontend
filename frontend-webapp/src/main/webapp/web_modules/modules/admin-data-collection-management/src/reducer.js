/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import collection from './model/CollectionReducers'
import model from './model/ModelReducers'
import modelAttribute from './model/ModelAttributeReducers'

const collectionDataManagementReducer = combineReducers({
  collection,
  model,
  'model-attribute': modelAttribute,
})

export default collectionDataManagementReducer
