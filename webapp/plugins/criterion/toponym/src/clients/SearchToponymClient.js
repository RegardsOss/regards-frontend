/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessProjectClient } from '@regardsoss/client'
import { ClientConfBuilder } from '@regardsoss/plugins-api'

/**
 * Search toponyms client.
 *
 * @author Théo Lasserre
 */
const pluginName = 'toponym-criteria'
/**
  * The store key used in reducer.js
  */
const storeKey = 'searchToponym'
const actionsBuilder = (namespace) => new AccessProjectClient.SearchToponymActions(namespace)
const reducerBuilder = (namespace) => AccessProjectClient.getSearchToponymReducer(namespace)
const selectorsBuilder = (storePath) => AccessProjectClient.getSearchToponymSelectors(storePath)

// Provide to the ClientConfBuilder a way to create action, selector and reducer
// These action, selector and reducer will be resolved on runtime with a local pluginInstanceId
const clientInfoBuilder = new ClientConfBuilder(pluginName, storeKey)
  .setActionsBuilder(actionsBuilder)
  .setSelectorsBuilder(selectorsBuilder)
  .setReducerBuilder(reducerBuilder)

// Expose searchToponym client
export function getSearchToponymClient(pluginInstanceId) {
  return clientInfoBuilder.getClient(pluginInstanceId)
}

// Expose searchToponym reducer
export function getSearchToponymReducer(pluginInstanceId) {
  return clientInfoBuilder.getReducer(pluginInstanceId)
}
