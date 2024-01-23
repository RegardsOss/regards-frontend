/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import includes from 'lodash/includes'
import values from 'lodash/values'
import omitBy from 'lodash/omitBy'
import concat from 'lodash/concat'
import without from 'lodash/without'
import BasicReducer from '../BasicReducer'

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
class BasicListReducers extends BasicReducer {
  constructor(options, basicListActionInstance) {
    super(basicListActionInstance, defaultState)
    this.entityKey = options.entityKey
    this.normalizrKey = options.normalizrKey
    this.basicListActionInstance = basicListActionInstance
  }

  rewriteEntity = function (state, action, stateUpdated) {
    const newState = { ...state, ...stateUpdated }
    const entityId = action.payload.result
    const items = { ...newState.items }
    items[entityId] = action.payload.entities[this.normalizrKey][entityId]
    newState.items = items
    if (!includes(values(newState.results), entityId)) {
      newState.results = concat([], newState.results, entityId)
    }
    return newState
  }

  deleteEntityFromState = function (state, action, stateUpdated) {
    const newState = { ...state, ...stateUpdated }
    newState.items = omitBy(newState.items, (proj) => proj.content[this.entityKey] === action.payload)
    newState.results = without(newState.results, action.payload)
    return newState
  }

  reduce(state = this.defaultState, action) {
    if (BasicReducer.isCancelled(state, action)) {
      return state
    }
    const newState = super.reduce(state, action)
    switch (action.type) {
      case this.basicListActionInstance.ENTITY_LIST_REQUEST:
      case this.basicListActionInstance.ENTITY_REQUEST:
        return {
          ...newState,
          isFetching: true,
          error: defaultState.error,
        }
      case this.basicListActionInstance.CREATE_ENTITY_REQUEST:
      case this.basicListActionInstance.CREATE_ENTITIES_REQUEST:
      case this.basicListActionInstance.DELETE_ENTITY_REQUEST:
      case this.basicListActionInstance.UPDATE_ENTITY_REQUEST:
        return {
          ...newState,
          isSyncing: true,
          error: defaultState.error,
        }
      case this.basicListActionInstance.ENTITY_LIST_FAILURE:
      case this.basicListActionInstance.ENTITY_FAILURE:
        return {
          ...newState,
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
          ...newState,
          isSyncing: false,
          error: {
            hasError: true,
            type: action.type,
            message: action.meta ? action.meta.errorMessage : '',
            status: action.meta ? action.meta.status : defaultState.error.status,
          },
        }
      case this.basicListActionInstance.ENTITY_LIST_SUCCESS:
        if (action.error) {
          return {
            ...newState,
            isSyncing: false,
            error: {
              hasError: true,
              type: action.type,
              message: action.payload.message,
              status: defaultState.error.status,
            },
          }
        }
        return {
          ...newState,
          isFetching: false,
          items: action.payload.entities[this.normalizrKey] || {},
          results: action.payload.result,
          error: defaultState.error,
        }
      case this.basicListActionInstance.CREATE_ENTITIES_SUCCESS:
        return {
          ...newState,
          isSyncing: false,
          items: {
            ...newState.items,
            ...action.payload.entities[this.normalizrKey],
          },
          results: action.payload.result,
          error: defaultState.error,
        }
      case this.basicListActionInstance.CREATE_ENTITY_SUCCESS:
      case this.basicListActionInstance.UPDATE_ENTITY_SUCCESS:
        return this.rewriteEntity(newState, action, { isSyncing: false, error: defaultState.error })
      case this.basicListActionInstance.ENTITY_SUCCESS:
        return this.rewriteEntity(newState, action, { isFetching: false, error: defaultState.error })
      case this.basicListActionInstance.DELETE_ENTITY_SUCCESS:
        return this.deleteEntityFromState(newState, action, { isFetching: false, error: defaultState.error })
      default:
        return newState
    }
  }
}

export default BasicListReducers
