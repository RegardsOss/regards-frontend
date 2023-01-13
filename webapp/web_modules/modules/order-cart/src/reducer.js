/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { createOrderReducer } from './client/CreateOrderClient'
import { searchDataobjectsReducer } from './client/ComplexSearchClient'
import { moduleDialogReducer } from './model/ModuleDialogReducer'
import { processingReducer } from './client/ProcessingClient'
import { linkProcessingDatasetReducer } from './client/LinkProcessingDatasetClient'
import { pluginMetaDataReducer } from './client/PluginMetaDataClient'
import { fileFiltersReducer } from './client/FileFiltersClient'

/**
 * Module reducer (configures there combined path at module level)
 */
export default {
  createOrder: createOrderReducer,
  dialog: moduleDialogReducer,
  searchDataobjects: searchDataobjectsReducer,
  processing: processingReducer,
  'plugin-meta-data': pluginMetaDataReducer,
  'link-processing-dataset': linkProcessingDatasetReducer,
  filefilters: fileFiltersReducer,
}
