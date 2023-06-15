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
import { CatalogClient } from '@regardsoss/client'

/**
 * Redux client builder to fetch and consume the property values required by this plugin. Note: plugin reducer and actions are
 * dynamically built on the instance name to ensure each plugin has its own separated redux store space
 * @param {string} pluginInstanceId plugin instance ID DOPropertiesValues model
 * @return {actions, reduder, selectors} client of
 * @author Théo Lasserre
 */
export default function getDOPropertiesValuesClient(pluginInstanceId) {
  // note: namespace requires to be unique among instances to avoid reduction conflicts
  const namespace = `geo-zone-criteria/${pluginInstanceId}`
  const actions = new CatalogClient.GeoValidateActions(namespace)
  return {
    actions,
  }
}
