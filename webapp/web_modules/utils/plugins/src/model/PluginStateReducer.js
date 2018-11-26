/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import PluginStateActions from './PluginStateActions'

/**
 * Criterion plugin state management reducer
 * @author Raphaël Mechali
 */
export class PluginStateReducer {
  /** Default reducer state */
  static DEFAULT_STATE = {}

  /**
   * Constructor
   * @param {string} namespace actions namespace
   */
  constructor(namespace) {
    this.actions = new PluginStateActions(namespace)
  }

  /**
   * Reduce method
   * @param {*} state previous reducer state
   * @param {*} action action to handle
   * @return {*} next reducer state
   */
  reduce(state = PluginStateReducer.DEFAULT_STATE, action) {
    switch (action.type) {
      case this.actions.PUBLISH_ALL_STATES: {
        const { pluginsStates } = action
        return {
          ...pluginsStates,
        }
      }
      case this.actions.PUBLISH_STATE: {
        const { pluginInstanceId, state: criterionState, query } = action
        return {
          ...state,
          [pluginInstanceId]: {
            state: criterionState,
            query,
          },
        }
      }
      case this.actions.CLEAR_ALL:
        return PluginStateReducer.DEFAULT_STATE
      default:
        return state
    }
  }
}

/**
 * Reducer closure builder
 * @param {string} namespace actions namespace
 * @return {Function} reduce function
 */
export function getPluginStateReducer(namespace) {
  const reducerInstance = new PluginStateReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
