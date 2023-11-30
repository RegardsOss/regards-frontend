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

import { BasicSelector } from '@regardsoss/store-utils'

/**
 * Client seectors to manage common authentication dialog
 * @author Sébastien Binda
 */
export class AuthenticationDialogSelectors extends BasicSelector {
  /**
   * Returns current state of the authentication dialog (true opened, false closed)
   * @return {boolean}
   */
  isAuthDialogOpen(state) {
    return this.uncombineStore(state).show
  }

  /**
   * Returns current selected main service provider name
   * @returns {string}
   */
  getMainService(state) {
    return this.uncombineStore(state).selectedMainServiceId
  }
}

/**
 * Returns an intsance of authentication selectors on given store path
 * @param  {[string]} store path: reducer store path
 * @return {AuthenticationDialogSelectors} AuthenticationDialogSelectors instance
 */
export default function getAuthenticationDialogSelectors(storePath) {
  return new AuthenticationDialogSelectors(storePath)
}
