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
 * My user actions, user interface: fetches authenticated project user and updates it (GET / PUT on the same URL)
 */
export default class MyUserActions extends BasicSignalActions {
  /**
   * Constructor
   */
  constructor(namespace) {
    super({
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES_PUBLIC.ADMIN}/users/myuser`,
      // Resource endpoint is not the accessed one. it is the secured one, not the public one.
      resourcesEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/users/myuser`,
      namespace,
      bypassErrorMiddleware: true,
    })
  }

  /**
   * Fetches my project user from server
   */
  fetchMyUser() {
    return this.sendSignal('GET')
  }

  updateMyUser(projectUser) {
    return this.sendSignal('PUT', projectUser)
  }
}
