/**
 * LICENSE_PLACEHOLDER
 **/
import { normalize } from 'normalizr'
import { forEach } from 'lodash'
import BasicActions from '../BasicActions'

const { CALL_API, getJSON } = require('redux-api-middleware')

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
  }


  /**
   * Fetch entities
   *
   * @param pathParams url path parameters TODO Specify the expected format
   * @param {Object} queryParams
   * @returns {{}}
   */
  fetchEntityList(pathParams, queryParams) {
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, pathParams)
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          {
            type: this.ENTITY_LIST_SUCCESS,
            payload: (action, state, res) => BasicListActions.extractPayload(res, json => this.normalizeEntitiesListPayload(json)),
          },
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint,
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
    let endpoint = this.handleRequestPathParameters(this.entityEndpoint, pathParams)
    endpoint = `${endpoint}/${keyValue}`
    endpoint = this.handleRequestQueryParams(endpoint, queryParams)
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_REQUEST,
          {
            type: this.ENTITY_SUCCESS,
            payload: (action, state, res) => BasicListActions.extractPayload(res, json => this.normalizeEntityPayload(json)),
          },
          this.buildFailureAction(this.ENTITY_FAILURE),
        ],
        endpoint,
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
    let endpoint = this.handleRequestPathParameters(this.entityEndpoint, pathParams)
    endpoint = `${endpoint}/${keyValue}`
    endpoint = this.handleRequestQueryParams(endpoint, queryParams)
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_REQUEST_SILENT,
          {
            type: this.ENTITY_SUCCESS,
            payload: (action, state, res) => BasicListActions.extractPayload(res, json => this.normalizeEntityPayload(json)),
          },
          this.buildFailureAction(this.ENTITY_FAILURE),
        ],
        endpoint,
        method: 'GET',
      },
    }
  }

  createEntity(values, pathParams, queryParams) {
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, pathParams)
    return {
      [CALL_API]: {
        types: [
          this.CREATE_ENTITY_REQUEST,
          {
            type: this.CREATE_ENTITY_SUCCESS,
            payload: (action, state, res) => BasicListActions.extractPayload(res, json => this.normalizeEntityPayload(json)),
          },
          this.buildFailureAction(this.CREATE_ENTITY_FAILURE),
        ],
        endpoint,
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
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, pathParams)
    return {
      [CALL_API]: {
        types: [
          this.CREATE_ENTITIES_REQUEST,
          {
            type: this.CREATE_ENTITIES_SUCCESS,
            payload: (action, state, res) => BasicListActions.extractPayload(res, json => this.normalizeEntitiesListPayload(json)),
          },
          this.buildFailureAction(this.CREATE_ENTITIES_FAILURE),
        ],
        endpoint,
        method: 'POST',
        body: JSON.stringify(object),
      },
    }
  }

  updateEntity(keyValue, values, pathParams, queryParams) {
    let endpoint = this.handleRequestPathParameters(this.entityEndpoint, pathParams)
    endpoint = `${endpoint}/${keyValue}`
    endpoint = this.handleRequestQueryParams(endpoint, queryParams)
    return {
      [CALL_API]: {
        types: [
          this.UPDATE_ENTITY_REQUEST,
          {
            type: this.UPDATE_ENTITY_SUCCESS,
            payload: (action, state, res) => BasicListActions.extractPayload(res, json => this.normalizeEntityPayload(json)),
          },
          this.buildFailureAction(this.UPDATE_ENTITY_FAILURE),
        ],
        endpoint,
        method: 'PUT',
        body: JSON.stringify(values),
      },
    }
  }

  deleteEntity(keyValue, pathParams, queryParams) {
    let endpoint = this.handleRequestPathParameters(this.entityEndpoint, pathParams)
    endpoint = `${endpoint}/${keyValue}`
    endpoint = this.handleRequestQueryParams(endpoint, queryParams)
    return {
      [CALL_API]: {
        types: [
          this.DELETE_ENTITY_REQUEST,
          {
            type: this.DELETE_ENTITY_SUCCESS,
            payload: keyValue,
          },
          this.buildFailureAction(this.DELETE_ENTITY_FAILURE),
        ],
        endpoint,
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
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, pathParams)
    const formData = BasicListActions.createFormData(objectValues, files)
    return {
      [CALL_API]: {
        types: [
          this.CREATE_ENTITY_REQUEST,
          {
            type: this.CREATE_ENTITY_SUCCESS,
            payload: (action, state, res) => BasicListActions.extractPayload(res, json => this.normalizeEntityPayload(json)),
          },
          this.buildFailureAction(this.CREATE_ENTITY_FAILURE),
        ],
        endpoint,
        method: 'POST',
        body: formData,
      },
    }
  }

  /**
   * Allows to send multiple objects on the same time
   * Requires that the API send back the updated entity
   * @param objectValues Object containing key - values with key expected by the API and value an object, a string,...
   * @param files Object containing key - values with key expected by the API and value a file
   * @param pathParams
   * @param queryParams
   * @returns {{}}
   */
  updateEntityUsingMultiPart(keyValue, objectValues, files, pathParams, queryParams) {
    let endpoint = this.handleRequestPathParameters(this.entityEndpoint, pathParams)
    endpoint = `${endpoint}/${keyValue}`
    endpoint = this.handleRequestQueryParams(endpoint, queryParams)
    const formData = BasicListActions.createFormData(objectValues, files)
    return {
      [CALL_API]: {
        types: [
          this.UPDATE_ENTITY_REQUEST,
          {
            type: this.UPDATE_ENTITY_SUCCESS,
            payload: (action, state, res) => BasicListActions.extractPayload(res, json => this.normalizeEntityPayload(json)),
          },
          this.buildFailureAction(this.UPDATE_ENTITY_FAILURE),
        ],
        endpoint,
        method: 'PUT',
        body: formData,
      },
    }
  }

  /**
      * Extracts payload from action result
      * @param res action result
      * @param normalizer function to normalize, (js ojbect) => (normalizedJsObject)
      * @return normalization promise
      */
  static extractPayload(res, normalizer) {
    return getJSON(res).then(json => normalizer(json))
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

  static createFormData(objectValues, files) {
    const formData = new FormData()
    // Handle object values
    forEach(objectValues, (value, key) => {
      if (typeof value === 'object') {
        // This is an object that we need to stringify
        formData.append(key,
          new Blob(
            [JSON.stringify(value)],
            {
              type: 'application/json',
            },
          ),
        )
      } else {
        formData.append(key, value)
      }
    })
    // Handle files
    forEach(files, (value, key) => {
      if (typeof value === 'object') {
        // This is an image
        formData.append(key, value)
      }
    })
    return formData
  }
}

export default BasicListActions
