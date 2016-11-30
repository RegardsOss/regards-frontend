/**
 * @author Léo Mieulet
 */
import { normalize } from 'normalizr'

const { CALL_API, getJSON } = require('redux-api-middleware')
/**
 *  Store the location of the selector in the redux tree, and provides a function to only retrieve the subset of the redux tree
 */
class BasicListActions {

  constructor(options) {
    this.entityEndpoint = options.entityEndpoint
    this.schemaTypes = {
      ENTITY: options.schemaTypes.ENTITY,
      ENTITY_ARRAY: options.schemaTypes.ENTITY_ARRAY,
    }
    this.ENTITY_LIST_REQUEST = `${options.namespace}_LIST_REQUEST`
    this.ENTITY_LIST_SUCCESS = `${options.namespace}_LIST_SUCCESS`
    this.ENTITY_LIST_FAILURE = `${options.namespace}_LIST_FAILURE`
    this.ENTITY_REQUEST = `${options.namespace}_REQUEST`
    this.ENTITY_SUCCESS = `${options.namespace}_SUCCESS`
    this.ENTITY_FAILURE = `${options.namespace}_FAILURE`
    this.DELETE_ENTITY_REQUEST = `DELETE_${options.namespace}_REQUEST`
    this.DELETE_ENTITY_SUCCESS = `DELETE_${options.namespace}_SUCCESS`
    this.DELETE_ENTITY_FAILURE = `DELETE_${options.namespace}_FAILURE`
    this.CREATE_ENTITY_SUCCESS = `CREATE_${options.namespace}_SUCCESS`
    this.CREATE_ENTITY_REQUEST = `CREATE_${options.namespace}_REQUEST`
    this.CREATE_ENTITY_FAILURE = `CREATE_${options.namespace}_FAILURE`
    this.UPDATE_ENTITY_SUCCESS = `UPDATE_${options.namespace}_SUCCESS`
    this.UPDATE_ENTITY_REQUEST = `UPDATE_${options.namespace}_REQUEST`
    this.UPDATE_ENTITY_FAILURE = `UPDATE_${options.namespace}_FAILURE`
  }

  fetchEntityList() {
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
        endpoint: this.entityEndpoint,
        method: 'GET',
      },
    }
  }
  fetchEntity(keyValue) {
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
        endpoint: `${this.entityEndpoint}/${keyValue}`,
        method: 'GET',
      },
    }
  }

  createEntity(values) {
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
        endpoint: this.entityEndpoint,
        method: 'POST',
        body: JSON.stringify(values),
      },
    }
  }

  updateEntity(keyValue, values) {
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
        endpoint: `${this.entityEndpoint}/${keyValue}`,
        method: 'PUT',
        body: JSON.stringify(values),
      },
    }
  }

  deleteEntity(keyValue) {
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
        endpoint: `${this.entityEndpoint}/${keyValue}`,
        method: 'DELETE',
      },
    }
  }
}


export default BasicListActions
