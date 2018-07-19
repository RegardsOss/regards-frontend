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
import DialogRequestsActions from './DialogRequestsActions'

/**
 * Show / hide dialog requests reducer
 * @author Raphaël Mechali
 */
export class DialogRequestsReducer {
  static DEFAULT_STATE = {
    visible: false,
    parameters: null,
    consumerID: null,
  }

  /**
   * Constructor
   * @param {string} namespace actions namespace, default user interface namespace when not provided
   */
  constructor(namespace) {
    this.actionsModel = new DialogRequestsActions(namespace)
  }


  /**
   * Reducer implementation for dialog requests
   */
  reduce(state = DialogRequestsReducer.DEFAULT_STATE, action) {
    switch (action.type) {
      case this.actionsModel.SHOW:
        return {
          visible: true,
          parameters: action.parameters,
          consumerID: action.consumerID,
        }
      case this.actionsModel.HIDE:
        return DialogRequestsReducer.DEFAULT_STATE
      default:
        return state
    }
  }
}

/**
 * Returns reduce function instance for a given namespace
 * @param {*} namespace namespace (optional, leave empty to get default reducer)
 */
export function getDialogRequestsReducer(namespace) {
  const reducer = new DialogRequestsReducer(namespace)
  return function reduce(state, action) {
    return reducer.reduce(state, action)
  }
}

