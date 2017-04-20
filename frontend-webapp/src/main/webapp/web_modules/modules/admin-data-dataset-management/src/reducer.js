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
import UIPluginConfigurationClient from './client/UIPluginConfigurationClient'
import UIPluginDefinitionClient from './client/UIPluginDefinitionClient'

const datasetDataManagementReducer = combineReducers({
  collection,
  dataset,
  model,
  datasource,
  'model-attribute': modelAttribute,
  'dataset-link': datasetLinkSignal,
  'plugin-configuration-services': pluginConfigurationServices,
  'plugin-configuration-converters': pluginConfigurationConverters,
  'plugin-configuration-filters': pluginConfigurationFilters,
  'plugin-meta-data-services': pluginMetaDataServices,
  'plugin-meta-data-converters': pluginMetaDataConverters,
  'plugin-meta-data-filters': pluginMetaDataFilters,
  'link-plugin-dataset': linkPluginDataset,
  'plugin-configuration': UIPluginConfigurationClient.uiPluginConfigurationReducers,
  'plugin-definition': UIPluginDefinitionClient.uiPluginDefinitionReducers,
})

export default datasetDataManagementReducer
