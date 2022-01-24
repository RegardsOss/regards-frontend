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
 */
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Actions to get Links Processing Dataset information
 * @author Théo Lasserre
 */
class LinkProcessingDatasetActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.PROCESSING}/processplugins/linkprocessdataset/{datasetIpId}`,
      namespace,
      bypassErrorMiddleware: false,
    })
  }

  /**
   * Sends a get process linked to dataset request
   * @param {*} datasetIpId of a dataset
   */
  getLinkProcessDataset(datasetIpId) {
    return this.sendSignal('GET', null, { datasetIpId })
  }

  /**
   * Update process linked to dataset
   * @param {*} datasetIpId  of a dataset
   */
  putLinkProcessDataset(datasetIpId, linkProcessingDataset) {
    return this.sendSignal('PUT', linkProcessingDataset, { datasetIpId })
  }
}

export default LinkProcessingDatasetActions
