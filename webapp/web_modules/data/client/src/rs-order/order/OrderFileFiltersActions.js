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
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Action to select criterions for basket files
 * @author Théo Lasserre
 */
class OrderFileFiltersActions extends BasicSignalActions {
  /**
   * Constructor
   * @param {*} namespace  actions namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ORDER}/order/basket/dataset/{datasetSelectionId}/updateFileFilters`,
    })
  }

  /**
   * Apply file selection filters
  */
  updateFileFilters(datasetSelectionId, filters) {
    return this.sendSignal('PUT', filters, {
      datasetSelectionId,
    })
  }
}

export default OrderFileFiltersActions