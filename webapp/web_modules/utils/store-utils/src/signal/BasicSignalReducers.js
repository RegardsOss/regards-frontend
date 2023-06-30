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
import get from 'lodash/get'

/**
 * @author Léo Mieulet
 */
import BasicReducer from '../BasicReducer'

/**
 *  Handle reduction for lists
 */
class BasicSignalReducers extends BasicReducer {
  static DEFAULT_STATE = {
    isFetching: false,
    statusCode: 200,
    error: {
      hasError: false,
      type: '',
      message: '',
      // XXX-Later versions delete me and similar in other Basic*Actions (see http://172.26.46.158:10080/regards/regards/issues/328)
      status: 200,
    },
  }

  /**
   * Constructor
   * @param {*} basicSignalActionInstance actions instance
   * @param {*} defaultResultValue default results value (as signal is not typed, value may be an array, an object...)
   */
  constructor(basicSignalActionInstance, defaultResultValue = {}) {
    super(basicSignalActionInstance, {
      ...BasicSignalReducers.DEFAULT_STATE,
      result: defaultResultValue,
    })
    this.basicSignalActionInstance = basicSignalActionInstance
  }

  reduce(state = this.defaultState, action) {
    if (this.isCancelled(state, action)) {
      return state
    }
    const newState = super.reduce(state, action)
    switch (action.type) {
      case this.basicSignalActionInstance.SIGNAL_REQUEST:
        return {
          ...newState,
          isFetching: true,
          error: BasicSignalReducers.DEFAULT_STATE.error,
        }
      case this.basicSignalActionInstance.SIGNAL_FAILURE:
        return {
          ...newState,
          isFetching: false,
          statusCode: get(action.meta, 'status', BasicSignalReducers.DEFAULT_STATE.error.status),
          error: {
            hasError: true,
            type: action.type,
            message: get(action.meta, 'errorMessage', ''),
            status: get(action.meta, 'status', BasicSignalReducers.DEFAULT_STATE.error.status),
          },
        }
      case this.basicSignalActionInstance.SIGNAL_SUCCESS:
        return {
          ...newState,
          isFetching: false,
          statusCode: get(action.meta, 'status', BasicSignalReducers.DEFAULT_STATE.error.status),
          error: BasicSignalReducers.DEFAULT_STATE.error,
          result: action.payload,
        }
      default:
        // not in this reducer
        return newState
    }
  }
}

export default BasicSignalReducers
