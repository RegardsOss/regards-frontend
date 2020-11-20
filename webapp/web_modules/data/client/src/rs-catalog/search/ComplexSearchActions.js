/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicPageableActions } from '@regardsoss/store-utils'
import { ENTITY, ENTITY_ARRAY } from '@regardsoss/api'

/**
 * Complex search entities actions
 * @author Raphaël Mechali
 */
export default class ComplexSearchActions extends BasicPageableActions {
  /**
   * Constructor
   * @param {*} namespace namespace for actions
   * @param {*} endpoint endpoint (optional, default to generic search catalog endpoint)
   */
  constructor(namespace,
    endpoint = `${GATEWAY_HOSTNAME}/${API_URL}/${STATIC_CONF.MSERVICES.CATALOG}/complex/search`) {
    super({
      namespace,
      entityEndpoint: endpoint,
      schemaTypes: {
        ENTITY,
        ENTITY_ARRAY,
      },
    })
  }

  /**
   * adapter for basic pageable API: reports page index and size in body, to match expected endpoint behavior
   *
   * @param {number} pageNumber pagination param : page number to request
   * @param {number} size pagination param : number of elements for the asked page
   * @param {*} pathParams [optional] path parameters to replace in endpoint uri
   * @param {*} queryParams [optional] query path parameters to add to the end of the endpoint uri
   * @param {*} bodyParams [option] bodyParams to use for requests. see CatalogShapes.ComplexSearchBody for more information
   * @returns {*} redux action to dispatch
   */
  fetchPagedEntityListByPost(pageNumber, size, pathParams, queryParams, bodyParams = {}) {
    return super.fetchPagedEntityListByPost(pageNumber, size, pathParams, queryParams, {
      page: pageNumber,
      size,
      ...bodyParams,
    })
  }
}
