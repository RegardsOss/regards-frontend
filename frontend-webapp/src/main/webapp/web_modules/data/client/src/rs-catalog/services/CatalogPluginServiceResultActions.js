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

import { DownloadFileActions } from '@regardsoss/store-utils'

/**
 * Fetch a catalog plugin service results.
 * @author Raphaël Mechali
 */
export default class CatalogPluginServiceResultActions extends DownloadFileActions {

  /**
   * Construtor
   * @param namespace -
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/services/{pluginConfigurationId}/apply`,
      headers: { Accept: '*/*' },
    })
  }

  /**
   * Fetches apply result
   * @param {*} pluginConfigurationId plugin configuration ID
   * @param {*} dynamicParameters dynamic parameters
   * @param {*} targetParams plugin service target related parameters, one of the following structures:*
   * { entity } | { entities } | { q, entityType }
   * @return action to dispatch in order to fetch plugin service results
   */
  fetchResult(pluginConfigurationId, dynamicParameters, targetParams) {
    return this.download({ pluginConfigurationId }, null, 'POST', { dynamicParameters, ...targetParams })
  }

}
