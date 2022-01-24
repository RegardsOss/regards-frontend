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
 * Actions to send refuse account signal
 * @author Raphaël Mechali
 */
export class RefuseAccountActions extends BasicSignalActions {
  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.IMSERVICES.ADMIN_INSTANCE}/accounts/{account_email}/refuse`,
      namespace,
    })
  }

  /**
   * Builds action to send refuse account signal to backend
   * @param {string} accountEmail account e-mail
   * @return {type: string, *} redux action to dispatch
   */
  sendRefuse(accountEmail) {
    return this.sendSignal('PUT', null, {
      // eslint-disable-next-line camelcase
      account_email: accountEmail, // eslint wont fix: matches server format
    })
  }
}

export default RefuseAccountActions
