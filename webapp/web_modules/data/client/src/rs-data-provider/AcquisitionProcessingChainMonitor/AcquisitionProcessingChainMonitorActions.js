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

import { BasicPageableActions } from '@regardsoss/store-utils'
import { ACQUISITION_PROCESSING_CHAIN_MONITOR, ACQUISITION_PROCESSING_CHAIN_MONITOR_ARRAY } from '@regardsoss/api'

/**
 * Actions to get generation chain list
 * @author Sébastien Binda
 */
class AcquisitionProcessingChainMonitorActions extends BasicPageableActions {
  /**
   * constructor
   * @param {*} namespace namespace
   */
  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.DATA_PROVIDER}/chain-monitoring`,
      namespace,
      schemaTypes: {
        ENTITY: ACQUISITION_PROCESSING_CHAIN_MONITOR,
        ENTITY_ARRAY: ACQUISITION_PROCESSING_CHAIN_MONITOR_ARRAY,
      },
    })
  }
}

export default AcquisitionProcessingChainMonitorActions
