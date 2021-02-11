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
import { ROLE, ROLE_ARRAY } from '@regardsoss/api'
import { BasicListActions } from '@regardsoss/store-utils'

/**
 * Actions to fetch borrowable roles list for an authenticated user
 */
export default class BorrowableRolesActions extends BasicListActions {
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES_PUBLIC.ADMIN}/roles/borrowables`,
      // Resource endpoint is not the accessed one. it is the secured one, not the public one.
      resourcesEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.ADMIN}/roles/borrowables`,
      schemaTypes: {
        ENTITY: ROLE,
        ENTITY_ARRAY: ROLE_ARRAY,
      },
    })
  }
}
