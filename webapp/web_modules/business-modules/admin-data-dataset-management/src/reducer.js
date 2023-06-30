/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { combineReducers } from 'redux'
import { datasetReducer } from './clients/DatasetClient'
import { modelReducer } from './clients/ModelClient'
import { modelAttributesReducer } from './clients/ModelAttributesClient'
import { datasetLinkReducer } from './clients/DatasetLinkClient'
import { datasetValidSubsettingTestReducer } from './clients/DatasetValidSubsettingTest'
import { datasourceReducer } from './clients/DatasourceClient'
import { collectionReducer } from './clients/CollectionClient'
import { pluginConfigurationReducer } from './clients/PluginConfigurationClient'
import { pluginMetaDataReducer } from './clients/PluginMetaDataClient'
import { linkPluginDatasetReducer } from './clients/LinkPluginDatasetClient'
import { uiPluginConfigurationReducer } from './clients/UIPluginConfigurationClient'
import { uiPluginDefinitionReducer } from './clients/UIPluginDefinitionClient'
import { linkUIPluginDatasetReducer } from './clients/LinkUIPluginDatasetClient'
import { linkProcessingDatasetReducer } from './clients/LinkProcessingDatasetClient'
import { processingReducer } from './clients/ProcessingClient'
import { processingMetaDataReducer } from './clients/ProcessingMetaDataClient'

const datasetDataManagementReducer = combineReducers({
  collection: collectionReducer,
  dataset: datasetReducer,
  model: modelReducer,
  datasource: datasourceReducer,
  processing: processingReducer,
  'model-attributes': modelAttributesReducer,
  'dataset-link': datasetLinkReducer,
  'plugin-configuration': pluginConfigurationReducer,
  'plugin-meta-data': pluginMetaDataReducer,
  'link-plugin-dataset': linkPluginDatasetReducer,
  'ui-plugin-configuration': uiPluginConfigurationReducer,
  'ui-plugin-definition': uiPluginDefinitionReducer,
  'link-ui-plugin-definition': linkUIPluginDatasetReducer,
  'dataset-valid-subsetting-test': datasetValidSubsettingTestReducer,
  'link-processing-dataset': linkProcessingDatasetReducer,
  'processing-meta-data': processingMetaDataReducer,
})

export default datasetDataManagementReducer
