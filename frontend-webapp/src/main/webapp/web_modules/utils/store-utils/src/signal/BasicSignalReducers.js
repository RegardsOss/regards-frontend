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

/**
 *  Handle reduction for lists
 */
class BasicSignalReducers {

  static DEFAULT_STATE = {
    isFetching: false,
    error: {
      hasError: false,
      type: '',
      message: '',
      status: 200,
    },
  }

  /**
   * Constructor
   * @param {*} basicSignalActionInstance actions instance
   * @param {*} defaultResultValue default results value (as signal is not typed, value may be an array, an object...)
   */
  constructor(basicSignalActionInstance, defaultResultValue = {}) {
    this.basicSignalActionInstance = basicSignalActionInstance
    this.defaultState = {
      ...BasicSignalReducers.DEFAULT_STATE,
      result: defaultResultValue,
    }
  }


  reduce(state = this.defaultState, action) {
    switch (action.type) {
      case this.basicSignalActionInstance.SIGNAL_REQUEST:
        return {
          ...state,
          isFetching: true,
          error: BasicSignalReducers.DEFAULT_STATE.error,
        }
      case this.basicSignalActionInstance.SIGNAL_FAILURE:
        return {
          ...state,
          isFetching: false,
          error: {
            hasError: true,
            type: action.type,
            message: action.meta ? action.meta.errorMessage : '',
            status: action.meta ? action.meta.status : BasicSignalReducers.DEFAULT_STATE.error.status,
          },
        }
      case this.basicSignalActionInstance.SIGNAL_SUCCESS:
        return {
          ...state,
          isFetching: false,
          error: BasicSignalReducers.DEFAULT_STATE.error,
          result: action.payload,
        }
      case this.basicSignalActionInstance.FLUSH:
        return BasicSignalReducers.DEFAULT_STATE
      default:
        // not in this reducer
        return state
    }
  }

}

export default BasicSignalReducers
