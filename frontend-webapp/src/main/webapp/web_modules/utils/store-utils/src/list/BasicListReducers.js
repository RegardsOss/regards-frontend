/**
 * @author Léo Mieulet
 */
import { omitBy } from 'lodash'

/**
 *  Handle reduction for lists
 */
class BasicListReducers {

  constructor(options, basicListActionInstance) {
    this.entityKey = options.entityKey
    this.normalizrKey = options.normalizrKey
    this.basicListActionInstance = basicListActionInstance
  }

  rewriteEntity = function (state, action) {
    const newState = Object.assign({}, state, { isFetching: false })
    const entityId = action.payload.result
    newState.items[entityId] = action.payload.entities[this.normalizrKey][entityId]
    return newState
  }

  deleteEntityFromState = function (state, action) {
    const newState = Object.assign({}, state, { isFetching: false })
    newState.items = omitBy(newState.items, proj => proj.content[this.entityKey] === action.payload)
    return newState
  }
  reduce(state = {
    isFetching: false,
    items: {},
    lastUpdate: '',
  }, action) {
    switch (action.type) {
      case this.basicListActionInstance.ENTITY_LIST_REQUEST:
      case this.basicListActionInstance.CREATE_ENTITY_REQUEST:
      case this.basicListActionInstance.DELETE_ENTITY_REQUEST:
      case this.basicListActionInstance.UPDATE_ENTITY_REQUEST:
      case this.basicListActionInstance.ENTITY_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
        })
      case this.basicListActionInstance.ENTITY_LIST_FAILURE:
      case this.basicListActionInstance.CREATE_ENTITY_FAILURE:
      case this.basicListActionInstance.DELETE_ENTITY_FAILURE:
      case this.basicListActionInstance.UPDATE_ENTITY_FAILURE:
      case this.basicListActionInstance.ENTITY_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
        })
      case this.basicListActionInstance.ENTITY_LIST_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.payload.entities[this.normalizrKey],
        })
      case this.basicListActionInstance.CREATE_ENTITY_SUCCESS:
      case this.basicListActionInstance.ENTITY_SUCCESS:
      case this.basicListActionInstance.UPDATE_ENTITY_SUCCESS:
        return this.rewriteEntity(state, action)
      case this.basicListActionInstance.DELETE_ENTITY_SUCCESS:
        return this.deleteEntityFromState(state, action)
      default:
        return state
    }
  }

}

export default BasicListReducers
