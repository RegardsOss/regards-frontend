/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ModuleDialogActions } from './ModuleDialogActions'

/**
 * Module dialog actions reducer: exposes values for dialog state
 * @author Raphaël Mechali
 */
class ModuleDialogReducer {
  /** Default reducer state */
  static DEFAULT_STATE = {
    detail: {
      visible: false,
      datasetLabel: null,
      date: null,
      selectionRequest: null,
    },
  }

  /**
   * Constructor
   * @param {*} namespace namespace of actions to reduce
   */
  constructor(namespace = ModuleDialogActions.DEFAULT) {
    this.actions = new ModuleDialogActions(namespace)
  }

  reduce(state = ModuleDialogReducer.DEFAULT_STATE, action) {
    switch (action.type) {
      case this.actions.SHOW_DETAIL:
        return {
          detail: {
            visible: true, datasetLabel: action.datasetLabel, date: action.date, selectionRequest: action.selectionRequest,
          },
        }
      case this.actions.HIDE_DETAIL:
        return ModuleDialogReducer.DEFAULT_STATE
      default:
        return state
    }
  }
}

/**
 * Reduce closure builder
 * @param {string} namespace Optional namespace (leave blank for default namespace)
 * @return reduce function closure on namespace
 */
function getReducer(namespace) {
  const instance = new ModuleDialogReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}

/**
 * Exports reduction function buider
 */
export const moduleDialogReducer = getReducer()
