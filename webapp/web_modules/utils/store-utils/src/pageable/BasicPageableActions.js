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
import { RSAA } from 'redux-api-middleware'
import BasicListActions from '../list/BasicListActions'
import BasicActions from '../BasicActions'
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
    const pageParameters = process.env.NODE_ENV === 'development' ? {
      // development mode page parameters managament
      offset: 0,
      page: pageNumber || 0,
      size: size || 1000,
    } : { // default page parameters managament
      page: pageNumber || 0,
      size: size || 2000,
    }
    return BasicActions.buildURL(this.entityEndpoint, pathParams, {
      ...pageParameters,
      ...(queryParams || {}),
    })
  }

  /**
   * Fetch a page of entities
   *
   * @param {number}pageNumber pagination param : page number to request
   * @param {number}size pagination param : number of elements for the asked page
   * @param {*} pathParams [optional] path parameters to replace in endpoint uri
   * @param {*} queryParams [optional] query path parameters to add to the end of the endpoint uri
   * @returns {*} redux action to dispatch
   */
  fetchPagedEntityList(pageNumber, size, pathParams, queryParams) {
    // Compute the endpoint URI
    const endpoint = this.getRequestEndpoint(pageNumber, size, pathParams, queryParams)
    return {
      [RSAA]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          this.buildSuccessAction(
            this.ENTITY_LIST_SUCCESS,
            (action, state, res) => BasicListActions.extractPayload(res, (json) => this.normalizeEntitiesPagePayload(json)),
          ),
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint,
        headers: this.headers,
        method: 'GET',
      },
    }
  }

  /**
   * Fetch a page of entities
   *
   * @param {number} pageNumber pagination param : page number to request
   * @param {number} size pagination param : number of elements for the asked page
   * @param {*} pathParams [optional] path parameters to replace in endpoint uri
   * @param {*} queryParams [optional] query path parameters to add to the end of the endpoint uri
   * @param {*} bodyParams [option] bodyParams to use for requests
   * @returns {*} redux action to dispatch
   */
  fetchPagedEntityListByPost(pageNumber, size, pathParams, queryParams, bodyParams) {
    // Compute the endpoint URI
    const endpoint = this.getRequestEndpoint(pageNumber, size, pathParams, queryParams)
    return {
      [RSAA]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          this.buildSuccessAction(
            this.ENTITY_LIST_SUCCESS,
            (action, state, res) => BasicListActions.extractPayload(res, (json) => this.normalizeEntitiesPagePayload(json)),
          ),
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint,
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify(bodyParams),
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
