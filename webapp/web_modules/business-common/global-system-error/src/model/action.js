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

/**
 * Action type to throw a new error and to open the error dialog box
 * @type {string}
 */
export const RECEIVE_ERROR = 'RECEIVE_ERROR'
/**
 * Action type to close the error dialog box
 * @type {string}
 */
export const CLOSE_ERROR_DIALOG = 'CLOSE_ERROR_DIALOG'

/**
 * Dispatch action
 */
export const closeErrorDialog = () => ({
  type: CLOSE_ERROR_DIALOG,
})

/**
 * Dispatch action with the given message as error to display in the error dialog box
 * @param message
 */
export const throwError = (message, meta, payload) => ({
  type: RECEIVE_ERROR,
  message,
  meta,
  payload,
})

export default {
  RECEIVE_ERROR,
  CLOSE_ERROR_DIALOG,
  closeErrorDialog,
  throwError,
}
