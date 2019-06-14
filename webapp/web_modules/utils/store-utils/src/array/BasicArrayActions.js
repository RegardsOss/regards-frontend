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
import BasicActions from '../BasicActions'
import { RSAA, getJSON } from 'redux-api-middleware'
/**
 *  Provide actions to retrieve an array of value
 *
 *  @Return dispatcheable redux actions
 *  @author Léo Mieulet
 */
class BasicArrayActions extends BasicActions {
  constructor(options) {
    super(options)
    this.namespace = options.namespace
    this.ENTITY_LIST_REQUEST = `${options.namespace}/LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/LIST_FAILURE`
    this.CREATE_ENTITIES_SUCCESS = `${options.namespace}/CREATE_ENTITIES_SUCCESS`
    this.CREATE_ENTITIES_REQUEST = `${options.namespace}/CREATE_ENTITIES_REQUEST`
    this.CREATE_ENTITIES_FAILURE = `${options.namespace}/CREATE_ENTITIES_FAILURE`
  }

  fetchEntityList(pathParams, queryParams) {
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, pathParams)
    return {
      [RSAA]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          this.buildSuccessAction(this.ENTITY_LIST_SUCCESS, (action, state, res) => getJSON(res)),
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint,
        method: 'GET',
      },
    }
  }

  /**
  * Allows to send multiple objects on the same time
  * Requires that the API send back new entities
  * @param objectValues Object containing key - values with key expected by the API and value an object, a string,...
  * @param files Object containing key - values with key expected by the API and value a file
  * @param pathParams
  * @param queryParams
  * @returns {{}}
  */
  createEntitiesUsingMultiPart(objectValues, files, pathParams, queryParams) {
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, pathParams)
    endpoint = BasicActions.useZuulSlugForMultiPartRoutes(endpoint)
    const formData = BasicActions.createFormDataWithFilesMap(objectValues, files)
    return {
      [RSAA]: {
        types: [
          this.CREATE_ENTITIES_REQUEST,
          this.buildSuccessAction(this.CREATE_ENTITIES_SUCCESS, (action, state, res) => getJSON(res)),
          this.buildFailureAction(this.CREATE_ENTITIES_FAILURE),
        ],
        endpoint,
        method: 'POST',
        body: formData,
      },
    }
  }
}


export default BasicArrayActions
