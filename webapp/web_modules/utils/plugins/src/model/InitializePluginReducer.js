/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { InitializePluginActions } from './InitializePluginActions'

/**
 * Reducer for plugins initialized state: stores, by instance ID, the fact plugin is initialized
 * @author Raphaël Mechali
 */
export class InitializePluginReducer {
  /** Default state: empty map */
  static DEFAULT_STATE = {}

  /**
   * Reduce method
   * @param {*} state current reducer state
   * @param {*} action redux action to reduce
   */
  reduce = (state = InitializePluginReducer.DEFAULT_STATE, action) => {
    switch (action.type) {
      case InitializePluginActions.MARK_INITIALIZED:
        return {
          ...state,
          [action.pluginInstanceId]: true,
        }
      case InitializePluginActions.MARK_UNLOADED:
        return {
          ...state,
          [action.pluginInstanceId]: false,
        }
      default:
        return state
    }
  }
}

/**
 * Reducer function instance
 */
export default new InitializePluginReducer().reduce
