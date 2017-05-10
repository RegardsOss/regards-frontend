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
import {
  pluginConfigurationConverters,
  pluginConfigurationServices,
  pluginConfigurationFilters,
} from './model/PluginConfigurationReducers'
import {
  pluginMetaDataConverters,
  pluginMetaDataServices,
  pluginMetaDataFilters,
} from './model/PluginMetaDataReducers'
import linkPluginDataset from './model/LinkPluginDatasetReducers'
import { uiPluginConfigurationReducer } from './client/UIPluginConfigurationClient'
import { uiPluginDefinitionReducer } from './client/UIPluginDefinitionClient'

const datasetDataManagementReducer = combineReducers({
  collection: collectionReducer,
  dataset: datasetReducer,
  model: modelReducer,
  datasource: datasourceReducer,
  'model-attribute': modelAttributesReducer,
  'dataset-link': datasetLinkReducer,
  'plugin-configuration-services': pluginConfigurationServices,
  'plugin-configuration-converters': pluginConfigurationConverters,
  'plugin-configuration-filters': pluginConfigurationFilters,
  'plugin-meta-data-services': pluginMetaDataServices,
  'plugin-meta-data-converters': pluginMetaDataConverters,
  'plugin-meta-data-filters': pluginMetaDataFilters,
  'link-plugin-dataset': linkPluginDataset,
  'ui-plugin-configuration': uiPluginConfigurationReducer,
  'ui-plugin-definition': uiPluginDefinitionReducer,
})

export default datasetDataManagementReducer
