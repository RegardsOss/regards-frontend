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
import { CatalogClient } from '@regardsoss/client'
import { ClientConfBuilder } from '@regardsoss/plugins-api'

/**
 * Requests client.
 *
 * @author Léo Mieulet
 */
const pluginName = 'fem-delete'
/**
 * the store key used in reducer.js
 */
const storeKey = 'requests'
const actionsBuilder = (namespace) => new CatalogClient.FEMFeatureRequestsActions(namespace)
const reducerBuilder = (namespace) => CatalogClient.getFEMFeatureRequestsReducer(namespace)
const selectorsBuilder = (storePath) => CatalogClient.getFEMFeatureRequestsSelectors(storePath)

// Provide to the ClientConfBuilder a way to create action, selector and reducer
// These action, selector and reducer will be resolved on runtime with a local pluginInstanceId
const clientInfoBuilder = new ClientConfBuilder(pluginName, storeKey)
  .setActionsBuilder(actionsBuilder)
  .setSelectorsBuilder(selectorsBuilder)
  .setReducerBuilder(reducerBuilder)

// Expose requests clients
export function getRequestsClient(pluginInstanceId) {
  return clientInfoBuilder.getClient(pluginInstanceId)
}
// Expose requests reducer
export function getRequestsReducer(pluginInstanceId) {
  return clientInfoBuilder.getReducer(pluginInstanceId)
}
