/**
 * LICENSE_PLACEHOLDER
 **/
import { combineReducers } from 'redux'
import { datasetReducer } from './clients/DatasetClient'
import { modelReducer } from './clients/ModelClient'
import { modelAttributesReducer } from './clients/ModelAttributesClient'
import { datasetLinkReducer } from './clients/DatasetLinkClient'
import { datasourceReducer } from './clients/DatasourceClient'
import { collectionReducer } from './clients/CollectionClient'
import { pluginConfigurationReducer } from './clients/PluginConfigurationClient'
import { pluginMetaDataReducer } from './clients/PluginMetaDataClient'
import { linkPluginDatasetReducer } from './clients/LinkPluginDatasetClient'
import { uiPluginConfigurationReducer } from './clients/UIPluginConfigurationClient'
import { uiPluginDefinitionReducer } from './clients/UIPluginDefinitionClient'
import { linkUIPluginDatasetReducer } from './clients/LinkUIPluginDatasetClient'

const datasetDataManagementReducer = combineReducers({
  collection: collectionReducer,
  dataset: datasetReducer,
  model: modelReducer,
  datasource: datasourceReducer,
  'model-attributes': modelAttributesReducer,
  'dataset-link': datasetLinkReducer,
  'plugin-configuration': pluginConfigurationReducer,
  'plugin-meta-data': pluginMetaDataReducer,
  'link-plugin-dataset': linkPluginDatasetReducer,
  'ui-plugin-configuration': uiPluginConfigurationReducer,
  'ui-plugin-definition': uiPluginDefinitionReducer,
  'link-ui-plugin-definition': linkUIPluginDatasetReducer,
})

export default datasetDataManagementReducer
