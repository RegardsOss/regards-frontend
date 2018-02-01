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
 * Specific actions to create an order (from current basket)
 * @author Raphaël Mechali
 */
class CreateOrderActions extends BasicSignalActions {
  /**
   * Constructor
   * @param {*} namespace actions namespace
   */
  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ORDER}/user/orders`,
      namespace,
    })
  }

  /**
   * @param {string} onSuccessOrderUrl Url used by the email to redirect the user on its orders
   * @return {type:{string}} redux action to dispatch the create order command
   */
  order(onSuccessOrderUrl) {
    return this.sendSignal('POST', { onSuccessUrl: onSuccessOrderUrl })
  }
}

export default CreateOrderActions
