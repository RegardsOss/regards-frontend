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
 * Specific actions to create an order (from current basket)
 * @author Raphaël Mechali
 */
class CreateOrderActions extends BasicSignalActions {
  /** Possible server errors */
  static SERVER_ERRORS = [
    'TOO_MANY_CHARACTERS_IN_LABEL',
    'LABEL_NOT_UNIQUE_FOR_OWNER',
  ]

  /**
   * Constructor
   * @param {*} namespace actions namespace
   */
  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ORDER}/user/orders`,
      namespace,
      bypassErrorMiddleware: true, // displayed locally
    })
  }

  /**
   * Creates order with label as parameter
   * @param {string} label new order label
   * @param {string} onSuccessOrderUrl URL used by the email to redirect the user to its orders list
   * @return {*} redux action to dispatch the create order command
   */
  order(label, onSuccessOrderUrl) {
    return this.sendSignal('POST', { label, onSuccessUrl: onSuccessOrderUrl })
  }
}

export default CreateOrderActions
