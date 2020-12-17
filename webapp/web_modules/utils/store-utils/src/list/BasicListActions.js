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
import { normalize } from 'normalizr'
import { RSAA, getJSON } from 'redux-api-middleware'
import BasicActions from '../BasicActions'

/**
 *  Provide actions for a specific type of entity list
 *
 *  @returns dispatcheable redux actions
 *  @author Léo Mieulet
 */
class BasicListActions extends BasicActions {
  /**
   * Class constructor
   *
   * @param options
   */
  constructor(options) {
    super(options)

    this.schemaTypes = {
      ENTITY: options.schemaTypes.ENTITY,
      ENTITY_ARRAY: options.schemaTypes.ENTITY_ARRAY,
    }
    this.ENTITY_REQUEST = `${options.namespace}/REQUEST`
    this.ENTITY_REQUEST_SILENT = `${options.namespace}/REQUEST_SILENT`
    this.ENTITY_SUCCESS = `${options.namespace}/SUCCESS`
    this.ENTITY_FAILURE = `${options.namespace}/FAILURE`
    this.DELETE_ENTITY_SUCCESS = `${options.namespace}/DELETE_SUCCESS`
    this.DELETE_ENTITY_REQUEST = `${options.namespace}/DELETE_REQUEST`
    this.DELETE_ENTITY_FAILURE = `${options.namespace}/DELETE_FAILURE`
    this.CREATE_ENTITY_SUCCESS = `${options.namespace}/CREATE_SUCCESS`
    this.CREATE_ENTITY_REQUEST = `${options.namespace}/CREATE_REQUEST`
    this.CREATE_ENTITY_FAILURE = `${options.namespace}/CREATE_FAILURE`
    this.CREATE_ENTITIES_SUCCESS = `${options.namespace}/CREATE_ENTITIES_SUCCESS`
    this.CREATE_ENTITIES_REQUEST = `${options.namespace}/CREATE_ENTITIES_REQUEST`
    this.CREATE_ENTITIES_FAILURE = `${options.namespace}/CREATE_ENTITIES_FAILURE`
    this.UPDATE_ENTITY_SUCCESS = `${options.namespace}/UPDATE_SUCCESS`
    this.UPDATE_ENTITY_REQUEST = `${options.namespace}/UPDATE_REQUEST`
    this.UPDATE_ENTITY_FAILURE = `${options.namespace}/UPDATE_FAILURE`
    this.ENTITY_LIST_REQUEST = `${options.namespace}/LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}/LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}/LIST_FAILURE`
  }

  /**
   * Fetch entities
   *
   * @param pathParams url path parameters
   * @param {Object} queryParams
   * @returns {{}}
   */
  fetchEntityList(pathParams, queryParams) {
    return {
      [RSAA]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          this.buildSuccessAction(
            this.ENTITY_LIST_SUCCESS,
            (action, state, res) => BasicListActions.extractPayload(res, (json) => this.normalizeEntitiesListPayload(json)),
          ),
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint: BasicActions.buildURL(this.entityEndpoint, pathParams, queryParams),
        headers: this.headers,
        method: 'GET',
      },
    }
  }

  /**
   * Fetch a single entity of id attribute keyValue.
   * Url path parameters are expected to be like so:
   * {
   *   param1Key: param1Value,
   *   param2Key: param2Value,
   *   ..
   * }
   *
   * @param keyValue
   * @param {Object} pathParams
   * @param {Object} queryParams
   * @returns {{}}
   */
  fetchEntity(keyValue, pathParams, queryParams) {
    return {
      [RSAA]: {
        types: [
          this.ENTITY_REQUEST,
          this.buildSuccessAction(
            this.ENTITY_SUCCESS,
            (action, state, res) => BasicListActions.extractPayload(res, (json) => this.normalizeEntityPayload(json)),
          ),
          this.buildFailureAction(this.ENTITY_FAILURE),
        ],
        endpoint: BasicActions.buildURL(`${this.entityEndpoint}/${keyValue}`, pathParams, queryParams),
        method: 'GET',
      },
    }
  }

  /**
   * Same as fetchEntity but do not set isFetching to true while fetching
   * @param keyValue
   * @param pathParams
   * @param queryParams
   * @returns {{}}
   */
  fetchSilentEntity(keyValue, pathParams, queryParams) {
    return {
      [RSAA]: {
        types: [
          this.ENTITY_REQUEST_SILENT,
          this.buildSuccessAction(
            this.ENTITY_SUCCESS,
            (action, state, res) => BasicListActions.extractPayload(res, (json) => this.normalizeEntityPayload(json)),
          ),
          this.buildFailureAction(this.ENTITY_FAILURE),
        ],
        endpoint: BasicActions.buildURL(`${this.entityEndpoint}/${keyValue}`, pathParams, queryParams),
        method: 'GET',
      },
    }
  }

  createEntity(values, pathParams, queryParams) {
    return {
      [RSAA]: {
        types: [
          this.CREATE_ENTITY_REQUEST,
          this.buildSuccessAction(
            this.CREATE_ENTITY_SUCCESS,
            (action, state, res) => BasicListActions.extractPayload(res, (json) => this.normalizeEntityPayload(json)),
          ),
          this.buildFailureAction(this.CREATE_ENTITY_FAILURE),
        ],
        endpoint: BasicActions.buildURL(this.entityEndpoint, pathParams, queryParams),
        method: 'POST',
        body: JSON.stringify(values),
      },
    }
  }

  /**
   * Send an object and receive a list of created items
   * @param values
   * @param pathParams
   * @param queryParams
   * @returns {{}}
   */
  createEntities(object, pathParams, queryParams) {
    return {
      [RSAA]: {
        types: [
          this.CREATE_ENTITIES_REQUEST,
          this.buildSuccessAction(
            this.CREATE_ENTITIES_SUCCESS,
            (action, state, res) => BasicListActions.extractPayload(res, (json) => this.normalizeEntitiesListPayload(json)),
          ),
          this.buildFailureAction(this.CREATE_ENTITIES_FAILURE),
        ],
        endpoint: BasicActions.buildURL(this.entityEndpoint, pathParams, queryParams),
        method: 'POST',
        body: JSON.stringify(object),
      },
    }
  }

  updateEntity(keyValue, values, pathParams, queryParams, endpoint = null, verb = 'PUT') {
    let endpointRequest = endpoint || this.entityEndpoint
    const pathParamsRequest = { ...pathParams }
    // 1. Add entity identifier into endpoint.
    // If the entityPathVariable is in the endpoint, handle it as a normal path parameter.
    // Else, add the identifier at the end of the endpoint
    if (this.entityPathVariable && endpointRequest.includes(`{${this.entityPathVariable}}`)) {
      pathParamsRequest[this.entityPathVariable] = keyValue
    } else {
      endpointRequest = `${endpointRequest}/${keyValue}`
    }
    // 2. Handle parameters
    endpointRequest = BasicActions.buildURL(endpointRequest, pathParamsRequest, queryParams)

    return {
      [RSAA]: {
        types: [
          this.UPDATE_ENTITY_REQUEST,
          this.buildSuccessAction(
            this.UPDATE_ENTITY_SUCCESS,
            (action, state, res) => BasicListActions.extractPayload(res, (json) => this.normalizeEntityPayload(json)),
          ),
          this.buildFailureAction(this.UPDATE_ENTITY_FAILURE),
        ],
        endpoint: endpointRequest,
        method: verb,
        body: JSON.stringify(values),
      },
    }
  }

  deleteEntity(keyValue, pathParams, queryParams) {
    return {
      [RSAA]: {
        types: [
          this.DELETE_ENTITY_REQUEST,
          this.buildSuccessAction(this.DELETE_ENTITY_SUCCESS, keyValue),
          this.buildFailureAction(this.DELETE_ENTITY_FAILURE),
        ],
        endpoint: BasicActions.buildURL(keyValue ? `${this.entityEndpoint}/${keyValue}` : this.entityEndpoint,
          pathParams, queryParams),
        method: 'DELETE',
      },
    }
  }

  deleteEntityWithPayloadResponse(keyValue, pathParams, queryParams) {
    return {
      [RSAA]: {
        types: [
          this.DELETE_ENTITY_REQUEST,
          this.buildSuccessAction(
            this.DELETE_ENTITY_SUCCESS,
            (action, state, res) => BasicListActions.extractPayload(res),
          ),
          this.buildFailureAction(this.DELETE_ENTITY_FAILURE),
        ],
        endpoint: BasicActions.buildURL(keyValue ? `${this.entityEndpoint}/${keyValue}` : this.entityEndpoint,
          pathParams, queryParams),
        method: 'DELETE',
      },
    }
  }

  /**
   * Allows to send multiple objects on the same time
   * Requires that the API send back a new entity
   * @param objectValues Object containing key - values with key expected by the API and value an object, a string,...
   * @param files Object containing key - values with key expected by the API and value a file
   * @param pathParams
   * @param queryParams
   * @returns {{}}
   */
  createEntityUsingMultiPart(objectValues, files, pathParams, queryParams) {
    return this.buildMultiPartsRSAAction(this.entityEndpoint, pathParams, queryParams,
      BasicActions.createFormDataWithFilesMap(objectValues, files), [
        this.CREATE_ENTITY_REQUEST,
        this.buildSuccessAction(
          this.CREATE_ENTITY_SUCCESS,
          (action, state, res) => BasicListActions.extractPayload(res, (json) => this.normalizeEntityPayload(json)),
        ),
        this.buildFailureAction(this.CREATE_ENTITY_FAILURE),
      ])
  }

  /**
   * Allows to send multiple objects on the same time
   * Requires that the API send back the updated entity
   * IT SENDS THE UPDATE USING THE VERB POST INSTEAD OF PUT (cf spec HTTP)
   * @param objectValues Object containing key - values with key expected by the API and value an object, a string,...
   * @param files Object containing key - values with key expected by the API and value a file
   * @param pathParams
   * @param queryParams
   * @returns {{}}
   */
  updateEntityUsingMultiPart(keyValue, objectValues, files, pathParams, queryParams) {
    return this.buildMultiPartsRSAAction(`${this.entityEndpoint}/${keyValue}`,
      pathParams, queryParams, BasicActions.createFormDataWithFilesMap(objectValues, files), [
        this.UPDATE_ENTITY_REQUEST,
        this.buildSuccessAction(
          this.UPDATE_ENTITY_SUCCESS,
          (action, state, res) => BasicListActions.extractPayload(res, (json) => this.normalizeEntityPayload(json)),
        ),
        this.buildFailureAction(this.UPDATE_ENTITY_FAILURE),
      ],
    )
  }

  /**
   * Allows to send multiple objects on the same time
   * Requires that the API send back a new entity
   * @param objectValues Object containing key - values with key expected by the API and value an object, a string,...
   * @param files Array of file(s)
   * @param fileKey the key expected by the api to retrieve the list of files
   * @param pathParams
   * @param queryParams
   * @returns {{}}
   */
  sendMultipleFiles(objectValues, files, fileKey, pathParams, queryParams) {
    return this.buildMultiPartsRSAAction(this.entityEndpoint, pathParams, queryParams,
      BasicActions.createFormDataWithFilesList(objectValues, files, fileKey), [
        this.CREATE_ENTITY_REQUEST,
        {
          type: this.CREATE_ENTITY_SUCCESS,
          payload: (action, state, res) => BasicListActions.extractPayload(res, (json) => this.normalizeEntityPayload(json)),
        },
        this.buildFailureAction(this.CREATE_ENTITY_FAILURE),
      ])
  }

  /**
      * Extracts payload from action result
      * @param res action result
      * @param normalizer function to normalize, (js ojbect) => (normalizedJsObject)
      * @return normalization promise
      */
  static extractPayload(res, normalizer) {
    if (normalizer) {
      return getJSON(res).then((json) => normalizer(json))
    }
    return getJSON(res).then((json) => json)
  }

  /**
    * Normalizes action payload as direct entities list payload
    * @param json JS object parsed from JSON result
    * @return normalized content
    */
  normalizeEntitiesListPayload(json) {
    return normalize(json, this.schemaTypes.ENTITY_ARRAY)
  }

  /**
    * Normalizes single entity payload
    * @param json JS object parsed from JSON result
    * @return normalized content
    */
  normalizeEntityPayload(json) {
    return normalize(json, this.schemaTypes.ENTITY)
  }
}

export default BasicListActions
