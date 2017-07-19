/**
* LICENSE_PLACEHOLDER
**//*
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
 */
import { BasicSignalActions } from '@regardsoss/store-utils'


/**
 * Redux actions to fetch plugin services that can be applied in a given result context
 * @author Raphaël Mechali
 */
export default class PluginServiceActions extends BasicSignalActions {

  /**
   * Construtor
   * @param namespace -
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/services`,
    })
  }

  /**
   * Fetches common plugin services for current results context
   * @param {*} datasetIpId dataset IP ID (optional)
   */
  fetchPluginServices(datasetIpId = null) {
    const queryParams = {
      // when fetching for catalog context, we ignore the ONE services, that are provided on entities
      'applicationModes[]': 'MANY',
    }
    if (datasetIpId) {
      queryParams.datasetIpId = datasetIpId
    }
    return this.sendSignal('GET', null, null, queryParams)
  }

}
