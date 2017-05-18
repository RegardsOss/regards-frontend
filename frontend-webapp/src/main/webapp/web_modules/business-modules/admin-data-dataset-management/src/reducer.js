/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { datasetReducer } from './client/DatasetClient'
import { modelReducer } from './client/ModelClient'
import { modelAttributesReducer } from './client/ModelAttributesClient'
import { datasetLinkReducer } from './client/DatasetLinkClient'
import { datasourceReducer } from './client/DatasourceClient'
import { collectionReducer } from './client/CollectionClient'
import { pluginConfigurationReducer } from './client/PluginConfigurationClient'
import { pluginMetaDataReducer } from './client/PluginMetaDataClient'
import linkPluginDataset from './model/LinkPluginDatasetReducers'
import { uiPluginConfigurationReducer } from './client/UIPluginConfigurationClient'
import { uiPluginDefinitionReducer } from './client/UIPluginDefinitionClient'

const datasetDataManagementReducer = combineReducers({
  collection: collectionReducer,
  dataset: datasetReducer,
  model: modelReducer,
  datasource: datasourceReducer,
  'model-attributes': modelAttributesReducer,
  'dataset-link': datasetLinkReducer,
  'plugin-configuration': pluginConfigurationReducer,
  'plugin-meta-data': pluginMetaDataReducer,
  'link-plugin-dataset': linkPluginDataset,
  'ui-plugin-configuration': uiPluginConfigurationReducer,
  'ui-plugin-definition': uiPluginDefinitionReducer,
})

export default datasetDataManagementReducer
