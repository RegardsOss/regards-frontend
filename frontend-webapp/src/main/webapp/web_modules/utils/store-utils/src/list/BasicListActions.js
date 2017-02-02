/**
 * LICENSE_PLACEHOLDER
 **/
import { split } from 'lodash'
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
   * @returns {{}}
   */
  fetchEntityList(params) {
    const endpoint = this.handleRequestParameters(this.entityEndpoint, params)
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_LIST_REQUEST,
          {
            type: this.ENTITY_LIST_SUCCESS,
            payload: (action, state, res) => getJSON(res).then(json => normalize(json, this.schemaTypes.ENTITY_ARRAY)),
          },
          this.ENTITY_LIST_FAILURE,
        ],
        endpoint,
        method: 'GET',
      },
    }
  }
  fetchEntity(keyValue, params) {
    let endpoint = this.handleRequestParameters(this.entityEndpoint, params)
    let queryParams = ''
    const endpointSplit = split(endpoint, '?')
    if (endpointSplit && endpointSplit.length > 1) {
      endpoint = endpointSplit[0]
      queryParams = `?${endpointSplit[1]}`
    }
    return {
      [CALL_API]: {
        types: [
          this.ENTITY_REQUEST,
          {
            type: this.ENTITY_SUCCESS,
            payload: (action, state, res) => getJSON(res).then(json => normalize(json, this.schemaTypes.ENTITY)),
          },
          this.ENTITY_FAILURE,
        ],
        endpoint: `${endpoint}/${keyValue}${queryParams}`,
        method: 'GET',
      },
    }
  }

  createEntity(values, params) {
    const endpoint = this.handleRequestParameters(this.entityEndpoint, params)
    return {
      [CALL_API]: {
        types: [
          this.CREATE_ENTITY_REQUEST,
          {
            type: this.CREATE_ENTITY_SUCCESS,
            payload: (action, state, res) => getJSON(res).then(json => normalize(json, this.schemaTypes.ENTITY)),
          },
          this.CREATE_ENTITY_FAILURE,
        ],
        endpoint,
        method: 'POST',
        body: JSON.stringify(values),
      },
    }
  }

  updateEntity(keyValue, values, params) {
    const endpoint = this.handleRequestParameters(this.entityEndpoint, params)
    return {
      [CALL_API]: {
        types: [
          this.UPDATE_ENTITY_REQUEST,
          {
            type: this.UPDATE_ENTITY_SUCCESS,
            payload: (action, state, res) => getJSON(res).then(json => normalize(json, this.schemaTypes.ENTITY)),
          },
          this.UPDATE_ENTITY_FAILURE,
        ],
        endpoint: `${endpoint}/${keyValue}`,
        method: 'PUT',
        body: JSON.stringify(values),
      },
    }
  }

  deleteEntity(keyValue, params) {
    const endpoint = this.handleRequestParameters(this.entityEndpoint, params)
    return {
      [CALL_API]: {
        types: [
          this.DELETE_ENTITY_REQUEST,
          {
            type: this.DELETE_ENTITY_SUCCESS,
            payload: keyValue,
          },
          this.DELETE_ENTITY_FAILURE,
        ],
        endpoint: `${endpoint}/${keyValue}`,
        method: 'DELETE',
      },
    }
  }
}

export default BasicListActions
