/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * @author Léo Mieulet
 */
import omitBy from 'lodash/omitBy'
import concat from 'lodash/concat'
import without from 'lodash/without'

const defaultState = {
  isFetching: false,
  isSyncing: false,
  error: {
    hasError: false,
    type: '',
    message: '',
    status: 200,
  },
  items: {},
  results: [],
  lastUpdate: '',
}
/**
 *  Handle reduction for lists
 */
class BasicListReducers {

  constructor(options, basicListActionInstance) {
    this.entityKey = options.entityKey
    this.normalizrKey = options.normalizrKey
    this.basicListActionInstance = basicListActionInstance
  }

  rewriteEntity = function (state, action, stateUpdated) {
    const newState = Object.assign({}, state, stateUpdated)
    const entityId = action.payload.result
    const items = Object.assign({}, newState.items)
    items[entityId] = action.payload.entities[this.normalizrKey][entityId]
    newState.items = items
    newState.results = concat([], newState.results, entityId)
    return newState
  }

  deleteEntityFromState = function (state, action, stateUpdated) {
    const newState = { ...state, ...stateUpdated }
    newState.items = omitBy(newState.items, proj => proj.content[this.entityKey] === action.payload)
    newState.results = without(newState.results, action.payload)
    return newState
  }

  reduce(state = defaultState, action) {
    switch (action.type) {
      case this.basicListActionInstance.ENTITY_LIST_REQUEST:
      case this.basicListActionInstance.ENTITY_REQUEST:
        return {
          ...state,
          isFetching: true,
          error: defaultState.error,
        }
      case this.basicListActionInstance.CREATE_ENTITY_REQUEST:
      case this.basicListActionInstance.CREATE_ENTITIES_REQUEST:
      case this.basicListActionInstance.DELETE_ENTITY_REQUEST:
      case this.basicListActionInstance.UPDATE_ENTITY_REQUEST:
        return {
          ...state,
          isSyncing: true,
          error: defaultState.error,
        }
      case this.basicListActionInstance.ENTITY_LIST_FAILURE:
      case this.basicListActionInstance.ENTITY_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: {
            hasError: true,
            type: action.type,
            message: action.meta ? action.meta.errorMessage : '',
            status: action.meta ? action.meta.status : defaultState.error.status,
          },
        }
      case this.basicListActionInstance.CREATE_ENTITY_FAILURE:
      case this.basicListActionInstance.CREATE_ENTITIES_FAILURE:
      case this.basicListActionInstance.DELETE_ENTITY_FAILURE:
      case this.basicListActionInstance.UPDATE_ENTITY_FAILURE:
        return {
          ...state,
          isSyncing: false,
          error: {
            hasError: true,
            type: action.type,
            message: action.meta ? action.meta.errorMessage : '',
            status: action.meta ? action.meta.status : defaultState.error.status,
          },
        }
      case this.basicListActionInstance.ENTITY_LIST_SUCCESS:
        return {
          ...state,
          isFetching: false,
          items: action.payload.entities[this.normalizrKey] || {},
          results: action.payload.result,
          error: defaultState.error,
        }
      case this.basicListActionInstance.CREATE_ENTITIES_SUCCESS:
        return {
          ...state,
          isSyncing: false,
          items: {
            ...state.items,
            ...action.payload.entities[this.normalizrKey],
          },
          results: action.payload.result,
          error: defaultState.error,
        }
      case this.basicListActionInstance.CREATE_ENTITY_SUCCESS:
      case this.basicListActionInstance.UPDATE_ENTITY_SUCCESS:
        return this.rewriteEntity(state, action, { isSyncing: false, error: defaultState.error })
      case this.basicListActionInstance.ENTITY_SUCCESS:
        return this.rewriteEntity(state, action, { isFetching: false, error: defaultState.error })
      case this.basicListActionInstance.DELETE_ENTITY_SUCCESS:
        return this.deleteEntityFromState(state, action, { isFetching: false, error: defaultState.error })
      case this.basicListActionInstance.FLUSH:
        return defaultState
      default:
        return state
    }
  }

}

export default BasicListReducers
