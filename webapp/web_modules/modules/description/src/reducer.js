/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { collectionAttributeModelReducer } from './clients/CollectionAttributeModelClient'
import { dataAttributeModelReducer } from './clients/DataobjectAttributeModelClient'
import { datasetAttributeModelReducer } from './clients/DatasetAttributeModelClient'
import { documentAttributeModelReducer } from './clients/DocumentAttributeModelClient'
import { modelAttributesReducer } from './clients/ModelAttributesClient'
import { descriptionStateReducer } from './clients/DescriptionStateClient'

/**
 * Reducers for description module
 * @author Raphaël Mechali
 */
const searchResultsReducers = {
  // admin reducers
  'collections-attributes': collectionAttributeModelReducer,
  'dataobjects-attributes': dataAttributeModelReducer,
  'datasets-attributes': datasetAttributeModelReducer,
  'documents-attributes': documentAttributeModelReducer,
  // user reducer
  model: modelAttributesReducer,
  descriptionState: descriptionStateReducer,
}

export default searchResultsReducers
