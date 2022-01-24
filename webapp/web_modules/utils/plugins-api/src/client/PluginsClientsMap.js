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

/**
 * Handles a lazy map of plugin clients by plugin instance ID and client name
 * @author Raphaël Mechali
 */
export default class PluginsClientsMap {
  /** Map of plugin instance ID => builder => builderResult */
  instancesClientsMap = {}

  /**
   * Returns lazy built client for plugin instance and client builder as parameter (note: function is used here
   * as the key map to avoid parameters overload...)
   * @param {function} clientBuilder function like (pluginInstanceId: string) => {actions, reducer, selectors}. Note: API user
   * is free to choose the returned object fields, therefore, function reference must always be the same from one call to another
   * @param {string} pluginInstanceId plugin instance id
   */
  getClient(clientBuilder, pluginInstanceId) {
    // 1 - recover or initialize map entry for pluginInstanceId
    let buildersForInstanceId = this.instancesClientsMap[pluginInstanceId]
    if (!buildersForInstanceId) {
      buildersForInstanceId = {}
      this.instancesClientsMap[pluginInstanceId] = buildersForInstanceId
    }

    // 2 - recover or initialize client for pluginInstanceId/clientBuilder
    let builtClient = buildersForInstanceId[clientBuilder]
    if (!builtClient) {
      builtClient = clientBuilder(pluginInstanceId)
      buildersForInstanceId[clientBuilder] = builtClient
    }
    // 3 - finally return client instance
    return builtClient
  }
}
