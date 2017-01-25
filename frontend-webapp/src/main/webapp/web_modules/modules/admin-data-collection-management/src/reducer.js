/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import collection from './model/CollectionReducers'

const collectionDataManagementReducer = combineReducers({
  collection,
})

export default collectionDataManagementReducer
