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
import { CatalogDomain } from '@regardsoss/domain'
import { BasicSignalActions } from '@regardsoss/store-utils'

/**
 * Actions to find an entity by its IP ID (unlike search entities, it will always provide a single entity as result)
 */
export default class SearchEntityActions extends BasicSignalActions {
  constructor(namespace, bypassErrorMiddleware = false) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/engines/${CatalogDomain.LEGACY_SEARCH_ENGINE}/entities/{urn}`,
      bypassErrorMiddleware,
    })
  }

  getEntity(urn) {
    return this.sendSignal('GET', null, { urn })
  }
}
