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
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Action to retrieve an order dataset details (corresponds to the list of files produced in an order for a given dataset)
 * @author Raphaël Mechali
 */
class OrderDatasetDetailActions extends BasicSignalActions {

  /**
   * Constructor
   * @param {*} namespace  actions namespace
   */
  constructor(namespace) {
    super({
      // TODO: should user access it through URL user/orders?
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ORDER}/orders/{order_id}/dataset/{dataset_id}`,
      namespace,
      // TODO: 2 this may need order dataset detail schema if backend returns a list
    })
  }

  /**
   * Returns action to dispatch to fetch order dataset detail
   * @param {*} orderId order ID
   * @param {*} datasetId dataset ID
   * @return {type: string, ...} redux action to dispatch to fetch order dataset detail
   */
  getOrderDatasetDetail(orderId, datasetId) {
    // TODO change if list actions
    return this.sendSignal('GET', null, { order_id: orderId, dataset_id: datasetId })
  }

}

export default OrderDatasetDetailActions

