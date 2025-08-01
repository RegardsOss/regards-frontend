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
 * Opensearch Descriptor client
 *
 * @author Maxime Bouveron
 */
const ENTITIES_STORE_PATH = ['admin', 'acquisition', 'datasource', 'opensearch-descriptor']
const REDUX_ACTION_NAMESPACE = 'admin-data-datasource-management/opensearch-descriptor'

export const descriptorReducer = DataManagementClient.OpensearchDescriptorReducer(REDUX_ACTION_NAMESPACE)
export const descriptorActions = new DataManagementClient.OpensearchDescriptorActions(REDUX_ACTION_NAMESPACE)
export const descriptorSelectors = DataManagementClient.OpensearchDescriptorSelectors(ENTITIES_STORE_PATH)
