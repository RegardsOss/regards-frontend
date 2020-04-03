
/*
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
 */
import { FemClient } from '@regardsoss/client'

/**
 * Requests client.
 *
 * @author Léo Mieulet
 */

/**
 * Redux client builder to fetch and consume REGARDS endpoints.
 * Note: namespace of these actions are build on runtime, to ensure each action
 *  will be reduced by only one reducer, yours.
 * @param {string} pluginInstanceId plugin instance ID
 * @return {actions, reduder, selectors} client of
 */
export default function getRequestsClient(pluginInstanceId) {
  // note: namespace are not shared between plugin instances to avoid reduction conflicts
  const namespace = `fem-delete/requests/${pluginInstanceId}`
  const requestsStorePath = [`plugins.fem-delete.${pluginInstanceId}`, 'requests']

  const actions = new FemClient.RequestsActions(namespace)
  const reducer = FemClient.getRequestsReducer(namespace)
  const selectors = FemClient.getRequestsSelectors(requestsStorePath)
  return {
    actions,
    reducer,
    selectors,
  }
}
