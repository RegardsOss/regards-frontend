/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicSignalActions, RequestVerbEnum } from '@regardsoss/store-utils'

/**
 * Actions to set a user quota
 * @author Raphaël Mechali
 */
export class SetQuotaActions extends BasicSignalActions {
  /**
   * Constructor
   * @param {string} namespace  actions namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ACCESS_PROJECT}/quota/{user_email}`,
    })
  }

  /**
   * Builds action to set a user quota
   * @param {string} email
   * @param {number} maxQuota
   * @param {number} rateLimit
   * @return {*} action to dispatch
   */
  setUserQuota = (email, maxQuota, rateLimit) => this.sendSignal(RequestVerbEnum.PUT, {
    email,
    maxQuota,
    rateLimit,
  }, { user_email: email })
}
