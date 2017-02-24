import { combineReducers } from 'redux'
import { modelDataManagementReducer } from '@regardsoss/admin-data-model-management'
import { attributeModelDataManagementReducer } from '@regardsoss/admin-data-attributemodel-management'
import { fragmentDataManagementReducer } from '@regardsoss/admin-data-fragment-management'
import { modelAttributeDataManagementReducer } from '@regardsoss/admin-data-modelattribute-management'
import { collectionDataManagementReducer } from '@regardsoss/admin-data-collection-management'
import { datasetDataManagementReducer } from '@regardsoss/admin-data-dataset-management'
import { datasourceDataManagementReducer } from '@regardsoss/admin-data-datasource-management'
import { connectionDataManagementReducer } from '@regardsoss/admin-data-connection-management'


const dataManagementReducer = combineReducers({
  'model-management': modelDataManagementReducer,
  'attribute-model-management': attributeModelDataManagementReducer,
  'model-attribute-management': modelAttributeDataManagementReducer,
  'fragment-management': fragmentDataManagementReducer,
  collection: collectionDataManagementReducer,
  dataset: datasetDataManagementReducer,
  datasource: datasourceDataManagementReducer,
  connection: connectionDataManagementReducer,
})


export default dataManagementReducer
