/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Specific signal actions used by admin to send accept / refuse for the waiting project users
 */
export default class ProjectUserSignalActions extends BasicSignalActions {
  constructor() {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/accesses/{access_id}/{updateOperation}`,
      namespace: 'admin-user-projectuser-management/project-user-signals',
    })
  }

  sendAccept(userId) {
    return this.sendSignal('PUT', null, {
      updateOperation: 'accept',
      access_id: userId,
    })
  }

  sendDeny(userId) {
    return this.sendSignal('PUT', null, {
      updateOperation: 'deny',
      access_id: userId,
    })
  }

  sendActive(userId) {
    return this.sendSignal('PUT', null, {
      updateOperation: 'active',
      access_id: userId,
    })
  }

  sendInactive(userId) {
    return this.sendSignal('PUT', null, {
      updateOperation: 'inactive',
      access_id: userId,
    })
  }

  /**
   * @return {string} dependency to perform update operation (required because those actions are indeed adressing multiple operations
   * using a path variable)
   */
  getAcceptDependency() {
    const withPathVariable = this.getDependency('PUT')
    return withPathVariable.replace('{updateOperation}', 'accept')
  }
}
