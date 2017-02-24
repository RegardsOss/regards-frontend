/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import dataset from './model/DatasetReducers'
import model from './model/ModelReducers'
import modelAttribute from './model/ModelAttributeReducers'
import datasetLinkSignal from './model/DatasetLinkReducers'
import datasource from './model/DatasourceReducers'
import collection from './model/CollectionReducers'

const datasetDataManagementReducer = combineReducers({
  collection,
  dataset,
  model,
  datasource,
  'model-attribute': modelAttribute,
  'dataset-link': datasetLinkSignal,
})

export default datasetDataManagementReducer
