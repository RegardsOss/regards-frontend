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
import { ApplicationErrorAction } from '@regardsoss/global-system-error'

class ErrorHandler {
  /**
   * Handle an error during HTTP Request error.
   *
   * @param dispatch redux store dispatch function
   * @param action error action to handle
   * @param state current state
   * @param res HTTP request response
   * @returns {{errorMessage: string}}
   */
  onRequestFailure = (dispatch, action, state, res) => {
    const statusText = res && res.statusText ? res.statusText : 'Server request error'
    const url = res && res.url ? res.url : action.type
    const message = `${statusText}. (${url})`

    // Send action to handle error display if any. See @regardsoss/global-system-error
    if (dispatch) {
      dispatch(ApplicationErrorAction.throwError(message))
    }

    // Return payload action error message
    return {
      errorMessage: statusText,
    }
  }
}

export default ErrorHandler
