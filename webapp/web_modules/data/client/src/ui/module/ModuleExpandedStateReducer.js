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
import { UIDomain } from '@regardsoss/domain'
import ModuleExpandedStateActions from './ModuleExpandedStateActions'

/**
 * Module expanded state reducer
 * @author Raphaël Mechali
 */
export class ModuleExpandedStateReducer {
  /** Reducer default state */
  static DEFAULT_STATE = {
    // state will hold each module type key
  }

  /**
   * Constructor
   * @param {*} namespace actions namespace
   */
  constructor(namespace) {
    this.actions = new ModuleExpandedStateActions(namespace)
  }

  /**
   * Reduces action or returns default state
   */
  reduce = (state = ModuleExpandedStateReducer.DEFAULT_STATE, action) => {
    switch (action.type) {
      case this.actions.INITIALIZE:
        return {
          ...state,
          [action.moduleType]: {
            expandable: action.expandable,
            state: action.state,
          },
        }
      case this.actions.SET_STATE: {
        const currentState = state[action.moduleType]
        // compute next state : collapse a pane only when it can be collapsed (set to normal state otherwise)
        const nextPaneState = action.state === UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED && !currentState.expandable
          ? UIDomain.PRESENTATION_STATE_ENUM.NORMAL
          : action.state

        return {
          ...state,
          [action.moduleType]: {
            expandable: currentState.expandable,
            state: nextPaneState,
          },
        }
      }
      default:
        return state
    }
  }
}

/**
 * Returns a reducer instance on actions namespace
 * @param {string} namespace actions namespace
 * @return {ModuleExpandedStateReducer} reducer instance
 */
export default function getModuleExpandedStateReducer(namespace) {
  const reducerInstance = new ModuleExpandedStateReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
