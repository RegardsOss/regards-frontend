/**
 * LICENSE_PLACEHOLDER
 **/
import { normalize } from 'normalizr'
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
    this.ENTITY_SUCCESS = `${options.namespace}/SUCCESS`
    this.ENTITY_FAILURE = `${options.namespace}/FAILURE`
    this.DELETE_ENTITY_SUCCESS = `${options.namespace}/DELETE_SUCCESS`
    this.DELETE_ENTITY_REQUEST = `${options.namespace}/DELETE_REQUEST`
    this.DELETE_ENTITY_FAILURE = `${options.namespace}/DELETE_FAILURE`
    this.CREATE_ENTITY_SUCCESS = `${options.namespace}/CREATE_SUCCESS`
    this.CREATE_ENTITY_REQUEST = `${options.namespace}/CREATE_REQUEST`
    this.CREATE_ENTITY_FAILURE = `${options.namespace}/CREATE_FAILURE`
    this.UPDATE_ENTITY_SUCCESS = `${options.namespace}/UPDATE_SUCCESS`
    this.UPDATE_ENTITY_REQUEST = `${options.namespace}/UPDATE_REQUEST`
    this.UPDATE_ENTITY_FAILURE = `${options.namespace}/UPDATE_FAILURE`
  }

  /**
   * Fetch entities
   *
   * @param params url params TODO Specify the expected format
   * @param {Object} queryParams
   * @returns {{}}
   */
  fetchEntityList(params, queryParams) {
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, params)
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          {
            type: this.ENTITY_LIST_SUCCESS,
            payload: (action, state, res) => getJSON(res).then(json => normalize(json, this.schemaTypes.ENTITY_ARRAY)),
          },
          this.buildFailureAction(this.ENTITY_LIST_FAILURE),
        ],
        endpoint,
        method: 'GET',
      },
    }
  }

  /**
   * Fetch a single entity of id attribute keyValue.
   * Url params are expected to be like so:
   * {
   *   param1Key: param1Value,
   *   param2Key: param2Value,
   *   ..
   * }
   *
   * @param keyValue
   * @param {Object} params
   * @param {Object} queryParams
   * @returns {{}}
   */
  fetchEntity(keyValue, params, queryParams) {
    let endpoint = this.handleRequestPathParameters(this.entityEndpoint, params)
    endpoint = `${endpoint}/${keyValue}`
    endpoint = this.handleRequestQueryParams(endpoint, queryParams)
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_REQUEST,
          {
            type: this.ENTITY_SUCCESS,
            payload: (action, state, res) => getJSON(res).then(json => normalize(json, this.schemaTypes.ENTITY)),
          },
          this.buildFailureAction(this.ENTITY_FAILURE),
        ],
        endpoint,
        method: 'GET',
      },
    }
  }

  createEntity(values, params, queryParams) {
    let endpoint = this.handleRequestQueryParams(this.entityEndpoint, queryParams)
    endpoint = this.handleRequestPathParameters(endpoint, params)
    return {
      [CALL_API]: {
        types: [
          this.CREATE_ENTITY_REQUEST,
          {
            type: this.CREATE_ENTITY_SUCCESS,
            payload: (action, state, res) => getJSON(res).then(json => normalize(json, this.schemaTypes.ENTITY)),
          },
          this.buildFailureAction(this.CREATE_ENTITY_FAILURE),
        ],
        endpoint,
        method: 'POST',
        body: JSON.stringify(values),
      },
    }
  }

  updateEntity(keyValue, values, params, queryParams) {
    let endpoint = this.handleRequestPathParameters(this.entityEndpoint, params)
    endpoint = `${endpoint}/${keyValue}`
    endpoint = this.handleRequestQueryParams(endpoint, queryParams)
    return {
      [CALL_API]: {
        types: [
          this.UPDATE_ENTITY_REQUEST,
          {
            type: this.UPDATE_ENTITY_SUCCESS,
            payload: (action, state, res) => getJSON(res).then(json => normalize(json, this.schemaTypes.ENTITY)),
          },
          this.buildFailureAction(this.UPDATE_ENTITY_FAILURE),
        ],
        endpoint,
        method: 'PUT',
        body: JSON.stringify(values),
      },
    }
  }

  deleteEntity(keyValue, params, queryParams) {
    let endpoint = this.handleRequestPathParameters(this.entityEndpoint, params)
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
}

export default BasicListActions
