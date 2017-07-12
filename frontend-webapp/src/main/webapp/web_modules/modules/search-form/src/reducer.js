/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { datasetReducer } from './clients/DatasetClient'
import { modelReducer } from './clients/ModelClient'
import { uiPluginDefinitionReducers } from './clients/UIPluginDefinitionClient'
import { datasetDataAttributesReducer } from './clients/DatasetDataAttributesClient'
import { AttributeModelReducer } from './clients/AttributeModelClient'

/**
 * Reducers for searc-form module
 * @type {{attributes: ((p1?:*, p2?:*)), datasets: ((p1?:*, p2?:*)), models: ((p1?:*, p2?:*)), criterion: ((p1?:*, p2?:*)), results: ((p1?:*, p2?:*))}}
 * @author Sébastien binda
 */
const formReducers = {
  'dataset-data-attributes': datasetDataAttributesReducer,
  attributes: AttributeModelReducer,
  datasets: datasetReducer,
  models: modelReducer,
  criterion: uiPluginDefinitionReducers,
}

export default formReducers
