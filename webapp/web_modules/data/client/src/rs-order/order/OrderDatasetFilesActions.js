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
import { BasicPageableActions } from '@regardsoss/store-utils'
import { ORDER_FILE, ORDER_FILE_ARRAY } from '@regardsoss/api'

/**
 * Action to retrieve an order dataset files
 * Note: It also provides path to file download
 * @author Raphaël Mechali
 */
class OrderDatasetFilesActions extends BasicPageableActions {
  /**
   * Constructor
   * @param {*} namespace  actions namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ORDER}/orders/{order_id}/dataset/{dataset_id}/files`,
      schemaTypes: {
        ENTITY: ORDER_FILE,
        ENTITY_ARRAY: ORDER_FILE_ARRAY,
      },
    })
  }
}

export default OrderDatasetFilesActions
