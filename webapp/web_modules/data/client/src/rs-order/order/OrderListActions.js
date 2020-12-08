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
import { ORDER, ORDER_ARRAY } from '@regardsoss/api'

/**
 * Actions to get order list with advancement for all or one user
 * @author Raphaël Mechali
 */
class OrderListActions extends BasicPageableActions {
  /** Endpoint for all users orders */
  static ALL_USERS_ORDERS_ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ORDER}/orders`

  /** Endpoint for current user orders */
  static MY_USER_ORDERS_ENDPOINT = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ORDER}/user/orders`

  /**
   * constructor
   * @param {*} namespace namespace
   * @param {*} isAllUser should get all users orders (or only current user ones)?
   */
  constructor(namespace, isAllUser = false) {
    super({
      bypassErrorMiddleware : true,
      entityEndpoint: isAllUser ? OrderListActions.ALL_USERS_ORDERS_ENDPOINT : OrderListActions.MY_USER_ORDERS_ENDPOINT,
      namespace,
      schemaTypes: {
        ENTITY: ORDER,
        ENTITY_ARRAY: ORDER_ARRAY,
      },
    })
  }
}

export default OrderListActions
