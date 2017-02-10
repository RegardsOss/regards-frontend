/**
 * @author Léo Mieulet
 */
import { omitBy } from 'lodash'

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
    return newState
  }

  deleteEntityFromState = function (state, action, stateUpdated) {
    const newState = { ...state, ...stateUpdated }
    newState.items = omitBy(newState.items, proj => proj.content[this.entityKey] === action.payload)
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
          items: action.payload.entities[this.normalizrKey],
          error: defaultState.error,
        }
      case this.basicListActionInstance.CREATE_ENTITY_SUCCESS:
      case this.basicListActionInstance.UPDATE_ENTITY_SUCCESS:
        return this.rewriteEntity(state, action, { isSyncing: false, error: defaultState.error })
      case this.basicListActionInstance.ENTITY_SUCCESS:
        return this.rewriteEntity(state, action, { isFetching: false, error: defaultState.error })
      case this.basicListActionInstance.DELETE_ENTITY_SUCCESS:
        return this.deleteEntityFromState(state, action, { isFetching: false, error: defaultState.error })
      default:
        return state
    }
  }

}

export default BasicListReducers
