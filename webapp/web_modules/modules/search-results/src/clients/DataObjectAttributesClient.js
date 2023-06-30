/*
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
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Client to retrieve DataObjects attributes from dataset informations.
 * Can be by dataSet identifiers or dataSet model identifiers.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['modules.search-results', 'dataObjectsAttributes']
const REDUX_ACTION_NAMESPACE = 'search-results/dataobjects-attributes'

export const dataObjectAttributesReducer = DataManagementClient.DatasetDataAttributesReducer(REDUX_ACTION_NAMESPACE)
export const dataObjectAttributesActions = new DataManagementClient.DatasetDataAttributesActions(REDUX_ACTION_NAMESPACE)
export const dataObjectAttributesSelectors = DataManagementClient.DatasetDataAttributesSelectors(ENTITIES_STORE_PATH)
