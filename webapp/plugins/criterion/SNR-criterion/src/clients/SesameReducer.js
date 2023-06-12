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
import SesameActions from './SesameActions'

/**
 * Sesame client reducer
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class SesameReducer {
  /** Default reducer state */
  static DEFAULT_STATE = {
    loading: false,
    error: false,
    spatialName: null,
    resolvedCoordinates: null,
  }

  /**
   * Constructor
   * @param {string} namespace actions namespace
   */
  constructor(namespace) {
    this.actions = new SesameActions(namespace) // keep actions to hold action.type IDs
  }

  /**
   * Reduce function: produces next state when actions are related with this reducer
   * @param {*} state current reducer state
   * @param {*} action action to handle (or ignore)
   * @return {*} next state (or current one if actions where ignored)
   */
  reduce = (state = SesameReducer.DEFAULT_STATE, action) => {
    switch (action.type) {
      case this.actions.REQUEST_STARTED_ACTION_ID:
        return { // Fetching started: update spatial name
          loading: true, // mark loading
          error: false, // reset any previous error
          spatialName: action.meta.spatialName, // keep spatial name
          resolvedCoordinates: null, // reset any previously resolved coordinates
        }
      case this.actions.REQUEST_FAILED_ACTION_ID:
        return action.meta.spatialName === state.spatialName ? { // Fetching failed
          loading: false, // No longer loading
          error: true, // mark error
          spatialName: state.spatialName,
          resolvedCoordinates: null,
        } : state // ignore otherwise (concurrency management)
      case this.actions.REQUEST_DONE_ACTION_ID:
        return action.meta.spatialName === state.spatialName ? { // Fetching done
          loading: false,
          error: !action.payload.coordinates, // in error when there is no resolved coordinates
          spatialName: state.spatialName,
          resolvedCoordinates: action.payload.coordinates, // keep resolved coordinates
        } : state // ignore otherwise (concurrency management)
      case this.actions.CLEAR_STATE_ACTION_ID:
        return SesameReducer.DEFAULT_STATE // clear state
      default:
        return state
    }
  }
}

/**
 * Builds reducer instance
 * @param {string} namespace reducer actions namespace
 * @return {Function} reduce function
 */
export default function getSesameReducer(namespace) {
  return new SesameReducer(namespace).reduce
}
