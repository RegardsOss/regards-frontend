/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import BasicReducer from '../BasicReducer'

/**
 * @author Léo Mieulet
 */
const defaultState = {
  isFetching: false,
  error: {
    hasError: false,
    type: '',
    message: '',
    status: 200,
  },
  items: [],
}
/**
 *  Handle reduction for arrays
 */
class BasicArrayReducers extends BasicReducer {
  constructor(basicArrayActionInstance) {
    super(basicArrayActionInstance, defaultState)
    this.basicArrayActionInstance = basicArrayActionInstance
  }

  reduce(state = defaultState, action) {
    if (this.isCancelled(state, action)) {
      return state
    }
    const newState = super.reduce(state, action)
    switch (action.type) {
      case this.basicArrayActionInstance.ENTITY_LIST_REQUEST:
      case this.basicArrayActionInstance.CREATE_ENTITIES_REQUEST:
        return {
          ...newState,
          isFetching: true,
          error: defaultState.error,
        }
      case this.basicArrayActionInstance.ENTITY_LIST_FAILURE:
      case this.basicArrayActionInstance.CREATE_ENTITIES_FAILURE:
        return {
          ...newState,
          error: {
            hasError: true,
            type: action.type,
            message: action.meta ? action.meta.errorMessage : '',
            status: action.meta ? action.meta.status : defaultState.error.status,
          },
        }
      case this.basicArrayActionInstance.ENTITY_LIST_SUCCESS:
        return {
          ...newState,
          isFetching: false,
          error: defaultState.error,
          items: action.payload,
        }
      case this.basicArrayActionInstance.CREATE_ENTITIES_SUCCESS:
        return {
          ...newState,
          isFetching: false,
          error: defaultState.error,
          items: action.payload,
        }
      default:
        return newState
    }
  }
}

export default BasicArrayReducers
