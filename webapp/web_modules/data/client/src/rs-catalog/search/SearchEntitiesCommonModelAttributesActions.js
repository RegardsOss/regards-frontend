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
 * Actions to find model attributes shared accross several object models
 */
export default class SearchEntitiesCommonModelAttributesActions extends BasicSignalActions {
  constructor(namespace, bypassErrorMiddleware = false) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/engines/${CatalogDomain.LEGACY_SEARCH_ENGINE}/dataobjects/search/attributes`,
      bypassErrorMiddleware,
    })
  }

  /**
   * Build an action that retrieve model attributes shared accross several object models
   * @param searchContext search context to match "selected" files
   */
  getCommonModelAttributes(searchContext) {
    return this.sendSignal('GET', null, null, searchContext.searchParameters)
  }
}
