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
import { CatalogDomain } from '@regardsoss/domain'
import { BasicListActions } from '@regardsoss/store-utils'
import { ATTRIBUTE_BOUNDS, ATTRIBUTE_BOUNDS_ARRAY } from '@regardsoss/api'

/**
 * Actions to compute some attributes bounds in a given request context (authentication context is implicit)
 * @author Raphaël Mechali
 */
export default class AttributesBoundsActions extends BasicListActions {
  /**
   * Constructor
   * @param {string} namespace actions namespace
   */
  constructor(namespace) {
    super({
      namespace,
      entityEndpoint: `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/engines/{engineType}/dataobjects/search/properties/bounds`,
      schemaTypes: {
        ENTITY: ATTRIBUTE_BOUNDS,
        ENTITY_ARRAY: ATTRIBUTE_BOUNDS_ARRAY,
      },
    })
  }

  /**
   * Builds and returns redux action to dispatch in order to fetch attributes bounds
   * @param {[string]} attributesPath Array of attributes path for which the bounds should be computed
   * @param {string} q query
   * @return {*} dispatchable redux action
   */
  fetchAttributesBounds(attributesPath, requestParameters) {
    return this.fetchEntityList({
      engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
    }, {
      properties: attributesPath.join(','),
      ...requestParameters,
    })
  }
}
