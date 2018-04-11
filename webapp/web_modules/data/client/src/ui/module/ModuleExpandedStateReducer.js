/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ModuleExpandedStateActions } from './ModuleExpandedStateActions'

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
            expanded: action.expanded,
          },
        }
      case this.actions.SET_EXPANDED_STATE: {
        const currentState = state[action.moduleType]
        // refuse switching the current state when unknown or not expandable/collapsible
        if (currentState && currentState.expandable) {
          return {
            ...state,
            [action.moduleType]: {
              expandable: currentState.expandable,
              expanded: action.expanded,
            },
          }
        }
        // ignore such event, the module was probably not mounted yet
        // as there was some long loading operation
        return state
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
export function getModuleExpandedStateReducer(namespace) {
  const reducerInstance = new ModuleExpandedStateReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
