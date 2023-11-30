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
import AuthenticationDialogActions from './AuthenticationDialogActions'

/**
 * Client reducer to manage common authentication dialog
 * @author Sébastien Binda
 */
export class AuthenticationDialogReducer {
  /** Reducer default state */
  static DEFAULT_STATE = {
    show: false,
    selectedMainServiceId: null,
  }

  /**
   * Constructor
   * @param {*} namespace actions namespace
   */
  constructor(namespace) {
    this.actions = new AuthenticationDialogActions(namespace)
  }

  /**
   * Reduces action or returns default state
   */
  reduce = (state = AuthenticationDialogReducer.DEFAULT_STATE, action) => {
    switch (action.type) {
      case this.actions.TOGGLE_AUTH_DIALOG_DISPLAY:
        return { ...state, show: action.show }
      case this.actions.SET_MAIN_SERVICE:
        return { ...state, selectedMainServiceId: action.selectedMainServiceId }
      default:
        return state
    }
  }
}

/**
 * Returns a feedback reducer instance on actions namespace
 * @param {string} namespace actions namespace
 * @return {FeedbackReducer} reducer instance
 */
export default function getAuthenticationDialogReducer(namespace) {
  const reducerInstance = new AuthenticationDialogReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
