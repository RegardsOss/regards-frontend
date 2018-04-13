/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import BasicListActions from '../list/BasicListActions'

const { CALL_API } = require('redux-api-middleware')
/**
 *  Provide actions for a specific type of entity pageable list
 *
 *  @returns dispatcheable redux actions
 *  @author Léo Mieulet
 */
class BasicPageableActions extends BasicListActions {
  constructor(options) {
    super(options)
    // rename actions to get correct logs
    this.ENTITY_LIST_REQUEST = `${options.namespace}/PAGEABLE_LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/PAGEABLE_LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/PAGEABLE_LIST_FAILURE`
  }

  /**
   * Fetch a page of entities
   *
   * @param index pagination param : index of the first result of the request
   * @param size pagination param : number of elements for the asked page
   * @param pathParams [optional] path parameters to replace in endpoint uri
   * @param queryParams [optional] query path parameters to add to the end of the endpoint uri
   * @returns string request endpoint
   */
  getRequestEndpoint(pageNumber, size, pathParams, queryParams) {
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, pathParams)

    // force paging return value in development mode
    if (process.env.NODE_ENV === 'development') {
      endpoint = this.handleRequestQueryParams(endpoint, {
        offset: 0,
        page: pageNumber || 0,
        size: size || 1000,
      })
    } else {
      endpoint = this.handleRequestQueryParams(endpoint, {
        page: pageNumber || 0,
        size: size || 100000,
      })
    }

    return endpoint
  }

  /**
   * Fetch a page of entities
   *
   * @param pageNumber pagination param : page number to request
   * @param size pagination param : number of elements for the asked page
   * @param pathParams [optional] path parameters to replace in endpoint uri
   * @param queryParams [optional] query path parameters to add to the end of the endpoint uri
   * @returns {{}}
   */
  fetchPagedEntityList(pageNumber, size, pathParams, queryParams) {
    // Compute the endpoint URI
    const endpoint = this.getRequestEndpoint(pageNumber, size, pathParams, queryParams)
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          this.buildSuccessAction(
            this.ENTITY_LIST_SUCCESS,
            (action, state, res) => BasicListActions.extractPayload(res, json => this.normalizeEntitiesPagePayload(json)),
          ),
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint,
        headers: this.headers,
        method: 'GET',
      },
    }
  }

  normalizeEntitiesPagePayload(json) {
    return {
      // entities are in content field
      ...super.normalizeEntitiesListPayload(json.content),
      links: json.links,
      metadata: json.metadata,
    }
  }

  /**
   * Disable because not supported
   *
   * @throws {Error}
   */
  fetchEntityList() {
    throw new Error(`Method call forbidden on ${this.constructor.name}. Please use fetchPagedEntityList instead.`)
  }
}

export default BasicPageableActions
